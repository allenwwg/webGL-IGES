
var DrawPointOnClick = require('./drawPointOnClick')
var UseBuffer = require('./createBuffer')
var Transform = require('./transform')
var MultiBuffer = require('./multiBuffer')
var Texture = require('./texture')
var ChangeView = require('./changeView')
var Cube = require('./cube')
var Lighting = require('./lighting')

var canvas = document.getElementById('canvas')
var gl = canvas.getContext('webgl')
gl.clearColor(0.0, 0.0, 0.0, 0.9)
gl.enable(gl.DEPTH_TEST)


initShader(gl, 'glsl/lighting.vert', 'glsl/lighting.frag', Lighting)

function initShader(gl, vsFile, fsFile, cb){
  var vs_source = null, fs_source = null, vertexShader = null, fragmentShader = null
  var onShaderLoaded = () => {
    if(vs_source !== null && fs_source !== null) {
      vertexShader = gl.createShader(gl.VERTEX_SHADER)
      gl.shaderSource(vertexShader, vs_source)
      gl.compileShader(vertexShader)

      fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
      gl.shaderSource(fragmentShader, fs_source)
      gl.compileShader(fragmentShader)

      gl.attachShader(glProgram, vertexShader)
      gl.attachShader(glProgram, fragmentShader)

      gl.linkProgram(glProgram)
      gl.useProgram(glProgram)
      gl.program = glProgram

      cb(gl)
    }
  }
  loadShaderFromFile(vsFile, (vsContent) => {
    vs_source = vsContent
    onShaderLoaded()
  })
  loadShaderFromFile(fsFile, (fsContent) => {
    fs_source = fsContent
    onShaderLoaded()
  })

  var glProgram = gl.createProgram()
}

