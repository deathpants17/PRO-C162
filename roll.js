AFRAME .registerComponent("balls",{
    init:function(){
        this.shootBowlingBall()
    },
    shootBowlingBall:function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key==="z"){
                var ball=document.createElement("a-entity")
                ball.setAttribute("geometry",{primitive:"sphere",radius:0.1})
                ball.setAttribute("material","color","red")
                var cam=document.querySelector("#camera")
                pos=cam.getAttribute("position")
                ball.setAttribute("position",{x:pos.x,y:pos.y,z:pos.z})
                // bullet.setAttribute("velocity",{x:0,y:0,z:-1})

                var camera=document.querySelector("#camera").object3D
                var direction=new THREE.Vector3()
                camera.getWorldDirection(direction)
                ball.setAttribute("velocity",direction.multiplyScalar(-10))
                var scene=document.querySelector("#scene")    
                scene.appendChild(ball)


            }
        })
    },
    removeBall:function(e){
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)
        var element=e.detail.target.el
        var elementHit=e.detail.body.el
        if(elementHit.id.includes("sphere")){
          elementHit.setAttribute("material",{opacity:1, transparent:true})
        }
        var impulse=new CANNON.Vector3(-2,2,1)
        var worldPoint=new CANNON.Vector3().copy(elementHit.getAttribute("position"))
        elementHit.body.applyImpulse(impulse,worldPoint)
    
        element.removeEventListener("collide",this.shoot())
        var scene=document.querySelector("#scene")
        scene.removeChild(element)
      }
})