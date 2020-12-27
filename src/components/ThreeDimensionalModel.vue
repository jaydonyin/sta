<template>
  <div class="container">
    <h3 class="container-title">3D模型展示</h3>
    <div id="canvas_div"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export default {
  name: 'ThreeDimensionalModel',
  data() {
    return {
      renderer: null,
      camera: null,
      scene: null,
      light: null,
      stats: null,
      controls: null,
      canvasDiv: {
        element: null,
        wigth: '',
        height: ''
      },
      mesh: null,
      objChildren: [],
      mousePosition: {
        mouseX: 0,
        mouseY: 0
      },
      raycaster: null,
      mouse: null,
      selectObj: null,
      timer: null,
      animationRenId: null,
      animationAniId: null
    }
  },
  methods: {
    initThree() {
      const _el = document.getElementById('canvas_div')
      this.canvasDiv.element = _el
      this.canvasDiv.wigth = _el.clientWidth
      this.canvasDiv.height = _el.clientHeight
    },
    initRenderer() {
      this.renderer = new THREE.WebGLRenderer()
      // this.renderer.setPixelRatio(window.devicePixelRatio) // 设置像素比
      this.renderer.setSize(this.canvasDiv.wigth, this.canvasDiv.height)
      this.renderer.setClearColor(0xCCCCCC, 1.0)
      this.canvasDiv.element.appendChild(this.renderer.domElement)
    },
    render() {
      this.renderer.clear()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.render)
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(75, this.canvasDiv.wigth / this.canvasDiv.height, 0.5, 1000)
      // 设置相机距离原点坐标的位置
      this.camera.position.x = 200
      this.camera.position.y = 200
      this.camera.position.z = 200
      // this.camera.up.x = 0
      // this.camera.up.y = 0
      // this.camera.up.z = 1
      // this.camera.lookAt({
      //   x: 0,
      //   y: 0,
      //   z: 0
      // })
    },
    initScene() {
      this.scene = new THREE.Scene()
    },
    initLight() {
      const ambientLight = new THREE.AmbientLight(0xCCCCCC, 0.4) // 环境光
      this.scene.add(ambientLight)
      this.light = new THREE.PointLight(0xffffff, 1) // 点光源
      this.light.position.set(50, 200, 100)
      this.scene.add(this.light)
    },
    initStats() {
      this.stats = new Stats()
      this.stats.dom.style.position = 'absolute'
      this.stats.dom.style.left = '0px'
      this.stats.dom.style.top = '0px'
      this.canvasDiv.element.appendChild(this.stats.dom)
    },
    initControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement) // , this.renderer.domElement

      // 如果使用animate方法时，将此函数删除
      // this.controls.addEventListener('change', this.render)
      // 使动画循环使用时阻尼或自转 意思是否有惯性
      this.controls.enableDamping = true
      // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
      // controls.dampingFactor = 0.25;
      // 是否可以缩放
      this.controls.enableZoom = true
      // 是否自动旋转
      this.controls.autoRotate = false
      // 设置相机距离原点的最远距离
      this.controls.minDistance = 1
      // 设置相机距离原点的最远距离
      this.controls.maxDistance = 1000
      // 是否开启右键拖拽
      this.controls.enablePan = true
    },
    initModel() {
      // 辅助工具：一个轴对象，以一种简单的方式可视化三个轴。
      // X轴为红色。 Y轴为绿色。 Z轴为蓝色。
      var helper = new THREE.AxesHelper(1000)
      this.scene.add(helper)

      const that = this

      var objLoader = new OBJLoader()
      var mtlLoader = new MTLLoader()
      mtlLoader.setPath('/static/3dmax/')
      // 加载mtl文件
      mtlLoader.load('file.mtl', function(material) {
        // 预加载
        material.preload()
        // 设置当前加载的纹理
        objLoader.setMaterials(material)
        objLoader.setPath('/static/3dmax/')
        objLoader.load('file.obj', function(object) {
          if (object.children) {
            // var meshes = object.children
            // meshes.forEach(element => {
            //   // element.material.color.setHex('0xfafafa')
            // })
            // 获取模型的某个部位
            // var obj2 = object.children[2]

            // // 设置模型某部位的样式
            // obj2.material.color.setHex('0xff0000')
            // obj2.material.opacity = 0.6
            // obj2.material.transparent = true
            // obj2.material.depthTest = false
            // that.objChildren.push(obj2)

            // 将模型缩放并添加到场景当中
            object.scale.set(1, 1, 1)
            that.scene.add(object)
          }
        }, that.onProgress, that.onError)
      })
    },
    onProgress(xhr) {
      if (xhr.lengthComputable) {
        var percentComplete = xhr.loaded / xhr.total * 100
        console.log(Math.round(percentComplete, 2) + '% downloaded')
      }
    }
    // loadObj() {
    //   //包含材质
    //   new MTLLoader().setPath('/static/3dmax/').load('file.mtl', materials => {
    //     materials.preload();
    //     new OBJLoader().setMaterials(materials).setPath('/static/3dmax/').load('file.obj', obj => {
    //       obj.scale.set(30, 30, 30);
    //       obj.position.set(0, 0, 0);
    //       this.scene.add(obj);
    //     });
    //   });
    // }
  },
  mounted() {
    this.initThree()
    this.initRenderer()
    this.initCamera()
    this.initScene()
    this.initLight()
    this.initStats()
    this.initControls()
    this.initModel()
    this.render()
    // this.init()
    // this.loadObj();
    // this.animate()
  }
}
</script>
<style scoped lang="scss">
.container {
  max-width: 1000px;
  padding: 50px 30px;
  box-sizing: border-box;
  flex-wrap: wrap;
  display: flex;
  &-title {
    width: 100%;
    color: $color;
    height: 40px;
    text-indent: 70px;
    line-height: 40px;
    font-weight: normal;
    font-size: 22px;
    background: url("../assets/images/statisticAnalyseTitle.png") no-repeat 0
      center;
    background-size: 53px 39px;
    margin-bottom: 40px;
  }
  &-left {
    width: 50%;
    height: 400px;
  }
  &-right {
    width: 50%;
    height: 400px;
  }
  &-echarts {
    width: 100%;
    height: 100%;
  }
}
#canvas_div {
  height: 400px;
  width: 100%;
}
</style>
