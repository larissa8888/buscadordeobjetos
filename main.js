estatus="";
objects=[];

function preload()
{
}

function setup()
{
    canvas=createCanvas(380 , 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380 , 380)
    video.hide()
   
}

function modelLoaded()
{
    console.log("modelo cargado");
    estatus= true ;
  }
function start()
{
 objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: dectectando objetos";
    object_name= document.getElementById("object_name").value;
}


function draw()
{
    image(video, 0, 0 ,380, 380);

    if(estatus!="")
    {

        r= random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: objeto detectado";
            


            fill(r, g, b);
            porcent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + porcent + "%" , objects[i].x , objects[i].y );

            noFill();
            stroke(r, g, b)
            rect(objects[i].x , objects[i].y, objects[i].width , objects[i].height);

            if(objects[i].label== object_name)
            {
              video.stop()
              objectDetector.detect(video, gotResult);
              document.getElementById("object_status").innerHTML = object_name + "Objecto encontrado";
              synth = window.speechSynthesis;
               utterThis = new SpeechSynthesisUtterance(object_name + "encontrado");
                synth.speak(utterThis);
            }else{
                document.getElementById("object_status").innerHTML = object_name + "No encontrado";   
            }
            
        }
    }

}

function gotResult(error, results)
{
 if(error)
 {
    console.error(error)
 }
 console.log(results);

 objects=results ;
}