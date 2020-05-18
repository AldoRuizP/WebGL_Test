
var canvas = document.getElementById("canvas")
var context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
var vertexShader = context.createShader(context.VERTEX_SHADER)
var fragmentShader = context.createShader(context.FRAGMENT_SHADER)
var program = context.createProgram()

function generateVertexShader(){
	var vertexShaderSource = document.querySelector("#vertex-shader").textContent
	context.shaderSource(vertexShader, vertexShaderSource)
	context.compileShader(vertexShader)
	if (!context.getShaderParameter(vertexShader, context.COMPILE_STATUS)) 
		throw new Error(context.getShaderInfoLog(vertexShader))
}

function generateFragmentShader(){
	var fragmentShaderSource = document.querySelector("#fragment-shader").textContent
	context.shaderSource(fragmentShader, fragmentShaderSource)
	context.compileShader(fragmentShader)
	if (!context.getShaderParameter(fragmentShader, context.COMPILE_STATUS)) 
		throw new Error(context.getShaderInfoLog(fragmentShader))
	return vertexShader
}

function prepareProgram(){
	generateVertexShader()
	generateFragmentShader()
	context.attachShader(program, vertexShader)
	context.attachShader(program, fragmentShader)
	context.linkProgram(program)
	if (!context.getProgramParameter(program, context.LINK_STATUS)) 
		throw new Error(context.getProgramInfoLog(program))
	context.useProgram(program)
}

function defineFigure(){
	var positionBuffer = context.createBuffer()
	context.bindBuffer(context.ARRAY_BUFFER, positionBuffer)
	context.bufferData(context.ARRAY_BUFFER, new Float32Array([
		0.0,  1.0, 
	 -1.0, -1.0,
		1.0, -1.0 
  ]), context.STATIC_DRAW)
}

function bindBuffer(){
	var positionAttribute = context.getAttribLocation(program, "a_position")
	context.enableVertexAttribArray(positionAttribute)
	context.vertexAttribPointer(positionAttribute, 2, context.FLOAT, false, 0, 0)
}

function main(){
	prepareProgram()
	defineFigure()
	bindBuffer()
	context.drawArrays(context.TRIANGLES, 0, 3)
}

main()

