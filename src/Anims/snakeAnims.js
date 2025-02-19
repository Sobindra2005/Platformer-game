export default SnakeAnims => {
    SnakeAnims.create({
        key: 'Enemy-2',
        frames: SnakeAnims.generateFrameNumbers('Enemy-2', { start: 0, end: 8 }),
        frameRate: 8,
        repeat: -1
    })
    SnakeAnims.create({
        key: 'Enemy-2-attack',
        frames: SnakeAnims.generateFrameNumbers('Enemy-2-attack', { start: 9, end: 18 }),
        frameRate: 15,
    })

    SnakeAnims.create({
        key: 'Enemy-2-hurt',
        frames: SnakeAnims.generateFrameNumbers('Enemy-2', { start: 19, end: 22 }),
        frameRate: 15,
    })

}