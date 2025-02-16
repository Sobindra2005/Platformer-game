export default BirdAnims => {
    BirdAnims.create({
        key: 'bird-idle',
        frames: BirdAnims.generateFrameNumbers('Enemy-2', { start: 0, end: 10 }),
        frameRate: 8,
        repeat: -1
    })
    BirdAnims.create({
        key: 'bird-attack',
        frames: BirdAnims.generateFrameNumbers('Enemy-2', { start: 13, end: 20 }),
        frameRate: 15,
    })

    BirdAnims.create({
        key: 'bird-defeat',
        frames: BirdAnims.generateFrameNumbers('Enemy-2', { start: 25, end: 27 }),
        frameRate: 15,
    })

}