const canvas = document.getElementById('draw-board');
const ctx = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 70;
var color = 'black';

function draw(x, y, size = 4, color) {
    ctx.fillStyle = color;
    var circle = new Path2D();
    const rect = canvas.getBoundingClientRect()
    circle.arc(x - rect.left, y - rect.top, size, 0, 2 * Math.PI);
    ctx.fill(circle);
}
function drag(e) {
    console.log(e);
}
const socket = io();
socket.on('draw', ({ x, y, size, color }) => {
    console.log(color);
    draw(x, y, size, color);
})
canvas.onmouseup = (e) => {
    canvas.onmousemove = (e) => { };
}

canvas.onmousedown = (e) => {
    const size = document.getElementById('pensize');
    canvas.onmousemove = (e) => {
        draw(e.clientX, e.clientY, size.value, color);
        socket.emit('draw', createPoint(e.clientX, e.clientY, size.value, color))
    }
}

function createPoint(x, y, size, color) {
    return {
        x, y, size, color
    }
}
const colorPicker = document.querySelector('.list-group');
colorPicker.addEventListener('click', (e) => {
    const picker = document.getElementsByClassName('list-group-item');
    console.log(picker);
    for (i = 0; i < picker.length; i++) {
        picker[i].classList.remove('active');
    }
    e.target.classList.add('active');
    console.log(e.target.dataset.color);
    color = e.target.dataset.color;
})