radio.onReceivedString(function (receivedString) {
    if (receivedString == "LEDL") {
        DFRobotMaqueenPlusV2.controlLED(MyEnumLed.eLeftLed, MyEnumSwitch.eOpen)
    } else if (receivedString == "LEDR") {
        DFRobotMaqueenPlusV2.controlLED(MyEnumLed.eRightLed, MyEnumSwitch.eOpen)
    } else {
        DFRobotMaqueenPlusV2.controlLED(MyEnumLed.eAllLed, MyEnumSwitch.eClose)
        DFRobotMaqueenPlusV2.controlMotorStop(MyEnumMotor.eAllMotor)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "F") {
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eAllMotor, MyEnumDir.eForward, Math.map(value, 550, 1023, 10, 255))
    } else if (name == "B") {
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eAllMotor, MyEnumDir.eBackward, Math.map(value, 1, 450, 255, 10))
    } else if (name == "L") {
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eRightMotor, MyEnumDir.eForward, Math.map(value, 1, 450, 255, 10))
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eLeftMotor, MyEnumDir.eForward, 20)
    } else if (name == "R") {
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eLeftMotor, MyEnumDir.eForward, Math.map(value, 550, 1023, 40, 255))
        DFRobotMaqueenPlusV2.controlMotor(MyEnumMotor.eRightMotor, MyEnumDir.eForward, 20)
    }
})
radio.setGroup(1)
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
basic.forever(function () {
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        basic.showLeds(`
            . . # . .
            . # # . .
            # . # . .
            . . # . .
            . . # . .
            `)
    } else if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        basic.showLeds(`
            # # # # .
            # . . # .
            . . # # .
            . # . . .
            # # # # .
            `)
    } else {
        basic.showLeds(`
            . # # # .
            . # . # .
            . # . # .
            . # . # .
            . # # # .
            `)
    }
})
