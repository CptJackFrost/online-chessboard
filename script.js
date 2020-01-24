let map;
let isDragging = false;
let isFlipped= false;

$(function() {
    main();
    $('.new').click(startNewGamePHP);
    $('.flip').click(flipBoard);
    setInterval(showFiguresPHP, 1500);
});

function main(){
    map = new Array(64);
    createBoard();
    showFiguresPHP();
}

function createBoard() {
    const square = '<div id="s$coord" class="square $color"></div>';

    $('.board').html('');
    for (let coord = 0; coord <64; coord++){
        $('.board').append(square
                .replace('$coord', isFlipped? 63 - coord : coord)
                .replace('$color', 
                    isBlackSquare(coord)? 'black' : 'white'));
    }

    setDroppable();
}

function isBlackSquare(coord) {
    return (Math.floor(coord / 8) + coord % 8) % 2;
}

function showFigureAt(coord, figure){
    const divFigure = '<div id="f$coord" class="figure">$figure</div>';
    if (map[coord] == figure) {return;}
    console.log(showFigureAt);
    map[coord] = figure;
    $('#s' + coord).html(divFigure
        .replace('$coord', coord)
        .replace('$figure', getChessSymbol(figure)));
    setDraggable();
}

function showFigures(figures){
    for (let coord = 0; coord < 64; coord++){
        showFigureAt(coord, figures.charAt(coord));
    }
}

function getChessSymbol(figures){
    switch(figures){
        case '1': return '';
        case 'k': return '&#9818';
        case 'q': return '&#9819';
        case 'r': return '&#9820';
        case 'b': return '&#9821';
        case 'n': return '&#9822';
        case 'p': return '&#9823';
        case 'K': return '&#9812';
        case 'Q': return '&#9813';
        case 'R': return '&#9814';
        case 'B': return '&#9815';
        case 'N': return '&#9816';
        case 'P': return '&#9817';
    }
}

function setDraggable() {
    $('.figure').draggable({
        start: (event, ui) => {
            isDragging = true;
        }
    });
}

function setDroppable() {
    $('.square').droppable({
        drop: (event, ui) => {
            let coordFrom = ui.draggable.attr('id').substring(1);
            let coordTo = event.target.id.substring(1);
            moveFigure(coordFrom, coordTo);
            moveFigurePHP(coordFrom, coordTo);
            isDragging = false;
        }
    });
}

function moveFigure(from, to){
    let figure = map[from];
    showFigureAt(from, '1');
    showFigureAt(to, figure);
}

function startNewGamePHP(){
    $.get('chess.php?newFigures', showFigures);
}

function flipBoard(){
    isFlipped = !isFlipped;
    main();
}

function showFiguresPHP(){
    if (isDragging) {return;}
    $.get('chess.php?getFigures', showFigures);
}

function moveFigurePHP(from, to){
    $.get('chess.php?moveFigure' + 
                '&coordFrom=' + from +
                '&coordTo=' + to,
            showFigures);
}

