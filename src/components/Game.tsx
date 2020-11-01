import React, { Fragment } from 'react'
// @ts-ignore
import * as PIXI from 'pixi.js'

const { Stage, Text } = PIXI
const height = window.innerHeight
const width = window.innerWidth
const options = {
  backgroundColor: 0xf46242,
}
// TODO Cristi why isn't this mounting?
function Game() {
  return (
    <Fragment>
      <Stage options={options} width={800} height={800}>
        <Text
          text="Area cleared!"
          style={{
            fontFamily: 'Arial',
            fontSize: '800%',
            fill: 0xffffff,
            align: 'center',
          }}
          anchor={[0.5, 0.5]}
          x={width / 2}
          y={height / 2}
        />
      </Stage>
    </Fragment>
  )
}

export default Game
