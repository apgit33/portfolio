window.addEventListener('scroll', function() {

    // -- Menu --
    // ---------------
    //Ajout de la classe nav-bg quand au moins 100 pixel de scroll
    let navBar = document.querySelector('nav')
    if (document.querySelector('html').scrollTop > 100) {
        navBar.classList.add('nav-bg')
    }else {
        navBar.classList.remove('nav-bg')
    }

    // -- Barre de progression --
    // ---------------
    // Calcul de la hauteur "utile" du document
    let hauteur = document.documentElement.scrollHeight - window.innerHeight
    // Récupération de la position verticale
    let position = window.scrollY
    // Récupération de la largeur de la fenêtre
    let largeur = document.documentElement.clientWidth
    // Calcul de la largeur de la barre
    let barre = position / hauteur * largeur
    // Modification du CSS de la barre
    document.getElementById("progress").style.width = barre+"px"

});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach( e => {
        e.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = e.dataset.target;
          const $target = document.getElementById(target);
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          e.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
});

window.onload = () => {
    // Ecouteur d'évènement sur scroll
    window.addEventListener("scroll", () => {

    })
}

particlesJS("particles-js", 
    {
        "particles":
        {
            "number":{"value":40,"density":{"enable":true,"value_area":800}},
            "color":{"value":"#123a0f"},
            "shape":{"type":"circle"},
            "opacity":{"value":1,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},
            "size":{"value":7.5,"random":true,"anim":{"enable":true,"speed":5,"size_min":0.1,"sync":false}},
            "line_linked":{"enable":true,"distance":166.6902811231592,"color":"#ffffff","opacity":1,"width":1.5},
            "move":
            {
                "enable":true,"speed":2,"direction":"none","random":false,
                "straight":false,"out_mode":"out","bounce":false,
                "attract":{"enable":false,"rotateX":4750.673012010037,"rotateY":4167.25702807898}
            }
        },
        "interactivity":
        {
            "detect_on":"canvas",
            "events":
            {
                "onhover":{"enable":true,"mode":"grab"},
                "onclick":{"enable":true,"mode":"remove"},
                "resize":true
            },
            "modes":
            {
                "grab":{"distance":190.03378378378363,"line_linked":{"opacity":0.2}},
                "bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},
                "repulse":{"distance":143.58108108108098,"duration":0.4},
                "push":{"particles_nb":4},
                "remove":{"particles_nb":10}
            }
        },
        "retina_detect":true});













        var radius = 120;
        var dtr = Math.PI/180;
        var d=300;
        
        var mcList = [];
        var active = false;
        var lasta = 1;
        var lastb = 1;
        var distr = true;
        var tspeed=2;
        var size=250;
        
        var mouseX=0;
        var mouseY=0;
        
        var howElliptical=1;
        
        var aA=null;
        var oDiv=null;
        
        window.onload=function ()
        {
            var i=0;
            var oTag=null;
            
            oDiv=document.getElementById('div1');
            
            aA=oDiv.getElementsByTagName('a');
            
            for(i=0;i<aA.length;i++)
            {
                oTag={};
                
                oTag.offsetWidth=aA[i].offsetWidth;
                oTag.offsetHeight=aA[i].offsetHeight;
                
                mcList.push(oTag);
            }
            
            sineCosine( 0,0,0 );
            
            positionAll();
            
            oDiv.onmouseover=function ()
            {
                active=true;
            };
            
            oDiv.onmouseout=function ()
            {
                active=false;
            };
            
            oDiv.onmousemove=function (ev)
            {
                var oEvent=window.event || ev;
                
                mouseX=oEvent.clientX-(oDiv.offsetLeft+oDiv.offsetWidth/2);
                mouseY=oEvent.clientY-(oDiv.offsetTop+oDiv.offsetHeight/2);
                
                mouseX/=2;
                mouseY/=5;
            };
            
            setInterval(update, 30);
        };
        
        function update()
        {
            var a;
            var b;
            
            if(active)
            {
                a = (-Math.min( Math.max( -mouseY, -size ), size ) / radius ) * tspeed;
                b = (Math.min( Math.max( -mouseX, -size ), size ) / radius ) * tspeed;
            }
            else
            {
                a = lasta * 0.98;
                b = lastb * 0.98;
            }
            
            lasta=a;
            lastb=b;
            
            if(Math.abs(a)<=0.01 && Math.abs(b)<=0.01)
            {
                return;
            }
            
            var c=0;
            sineCosine(a,b,c);
            for(var j=0;j<mcList.length;j++)
            {
                var rx1=mcList[j].cx;
                var ry1=mcList[j].cy*ca+mcList[j].cz*(-sa);
                var rz1=mcList[j].cy*sa+mcList[j].cz*ca;
                
                var rx2=rx1*cb+rz1*sb;
                var ry2=ry1;
                var rz2=rx1*(-sb)+rz1*cb;
                
                var rx3=rx2*cc+ry2*(-sc);
                var ry3=rx2*sc+ry2*cc;
                var rz3=rz2;
                
                mcList[j].cx=rx3;
                mcList[j].cy=ry3;
                mcList[j].cz=rz3;
                
                per=d/(d+rz3);
                
                mcList[j].x=(howElliptical*rx3*per)-(howElliptical*2);
                mcList[j].y=ry3*per;
                mcList[j].scale=per;
                mcList[j].alpha=per;
                
                mcList[j].alpha=(mcList[j].alpha-0.6)*(10/6);
            }
            
            doPosition();
            depthSort();
        }
        
        function depthSort()
        {
            var i=0;
            var aTmp=[];
            
            for(i=0;i<aA.length;i++)
            {
                aTmp.push(aA[i]);
            }
            
            aTmp.sort
            (
                function (vItem1, vItem2)
                {
                    if(vItem1.cz>vItem2.cz)
                    {
                        return -1;
                    }
                    else if(vItem1.cz<vItem2.cz)
                    {
                        return 1;
                    }
                    else
                    {
                        return 0;
                    }
                }
            );
            
            for(i=0;i<aTmp.length;i++)
            {
                aTmp[i].style.zIndex=i;
            }
        }
        
        function positionAll()
        {
            var phi=0;
            var theta=0;
            var max=mcList.length;
            var i=0;
            
            var aTmp=[];
            var oFragment=document.createDocumentFragment();
            
            for(i=0;i<aA.length;i++)
            {
                aTmp.push(aA[i]);
            }
            
            aTmp.sort
            (
                function ()
                {
                    return Math.random()<0.5?1:-1;
                }
            );
            
            for(i=0;i<aTmp.length;i++)
            {
                oFragment.appendChild(aTmp[i]);
            }
            
            oDiv.appendChild(oFragment);
            
            for( var i=1; i<max+1; i++){
                if( distr )
                {
                    phi = Math.acos(-1+(2*i-1)/max);
                    theta = Math.sqrt(max*Math.PI)*phi;
                }
                else
                {
                    phi = Math.random()*(Math.PI);
                    theta = Math.random()*(2*Math.PI);
                }
                //×ø±ê±ä»»
                mcList[i-1].cx = radius * Math.cos(theta)*Math.sin(phi);
                mcList[i-1].cy = radius * Math.sin(theta)*Math.sin(phi);
                mcList[i-1].cz = radius * Math.cos(phi);
                
                aA[i-1].style.left=mcList[i-1].cx+oDiv.offsetWidth/2-mcList[i-1].offsetWidth/2+'px';
                aA[i-1].style.top=mcList[i-1].cy+oDiv.offsetHeight/2-mcList[i-1].offsetHeight/2+'px';
            }
        }
        
        function doPosition()
        {
            var l=oDiv.offsetWidth/2;
            var t=oDiv.offsetHeight/2;
            for(var i=0;i<mcList.length;i++)
            {
                aA[i].style.left=mcList[i].cx+l-mcList[i].offsetWidth/2+'px';
                aA[i].style.top=mcList[i].cy+t-mcList[i].offsetHeight/2+'px';
                
                aA[i].style.fontSize=Math.ceil(12*mcList[i].scale/2)+8+'px';
                
                aA[i].style.filter="alpha(opacity="+100*mcList[i].alpha+")";
                aA[i].style.opacity=mcList[i].alpha;
            }
        }
        
        function sineCosine( a, b, c)
        {
            sa = Math.sin(a * dtr);
            ca = Math.cos(a * dtr);
            sb = Math.sin(b * dtr);
            cb = Math.cos(b * dtr);
            sc = Math.sin(c * dtr);
            cc = Math.cos(c * dtr);
        }