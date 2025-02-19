export default BirdAnims => {
    BirdAnims.create({
        key: 'Enemy-1',
        frames: BirdAnims.generateFrameNumbers('Enemy-1', { start: 0, end: 12 }),
        frameRate: 8,
        repeat: -1
    })
    BirdAnims.create({
        key: 'Enemy-1-attack',
        frames: BirdAnims.generateFrameNumbers('Enemy-1-attack', { start: 13, end: 19 }),
        frameRate: 15,
        repeat: -1 ,
    })

    BirdAnims.create({
        key: 'Enemy-1-hurt',
        frames: BirdAnims.generateFrameNumbers('Enemy-1', { start: 24, end: 27 }),
        frameRate: 15,
    })

}