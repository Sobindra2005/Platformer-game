export default SnakeAnims => {
    SnakeAnims.create({
        key: 'snake-idle',
        frames: SnakeAnims.generateFrameNumbers('Enemy-1', { start: 0, end: 8 }),
        frameRate: 8,
        repeat: -1
    })
    SnakeAnims.create({
        key: 'snake-attack',
        frames: SnakeAnims.generateFrameNumbers('Enemy-1', { start: 15, end: 20 }),
        frameRate: 15,
    })

    SnakeAnims.create({
        key: 'snake-defeat',
        frames: SnakeAnims.generateFrameNumbers('Enemy-1', { start: 21, end: 23 }),
        frameRate: 15,
    })

}