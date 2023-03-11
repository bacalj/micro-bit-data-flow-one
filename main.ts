/**
 */
input.onButtonPressed(Button.A, function () {
    mode = 1
    basic.showIcon(IconNames.Ghost)
})
input.onButtonPressed(Button.AB, function () {
    mode = 0
    basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        `)
})
input.onButtonPressed(Button.B, function () {
    mode = 2
    basic.showIcon(IconNames.Yes)
})
radio.onReceivedValue(function (name, value) {
    if (mode == 2) {
        serial.writeLine("foo")
        led.plotBarGraph(
        value,
        3000
        )
    }
})
let mode = 0
radio.setGroup(1)
mode = 0
serial.redirect(
SerialPin.USB_TX,
SerialPin.USB_RX,
BaudRate.BaudRate9600
)
basic.showLeds(`
    . . . . .
    . . . . .
    # # # # #
    . . . . .
    . . . . .
    `)
/**
 * MVP
 * 
 * mode 0   does nothing
 * 
 * mode a  - broadcasts acceleration to channel 1
 * 
 * mode d  - listens for acceleration, passes it on to serial as mba:n
 */
basic.forever(function () {
    if (mode == 1) {
        radio.sendValue("a", input.acceleration(Dimension.Strength))
    }
})
