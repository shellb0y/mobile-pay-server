String.prototype.padLeft = function(totalWidth, paddingChar) {
    if ( paddingChar != null ) {
        return this.padHelper(totalWidth, paddingChar, false);
    } else {
        return this.padHelper(totalWidth, ' ', false);
    }
}

String.prototype.padRight = function(totalWidth, paddingChar) {
    if ( paddingChar != null ) {
        return this.padHelper(totalWidth, paddingChar, true);
    } else {
        return this.padHelper(totalWidth, ' ', true);
    }

}

String.prototype.padHelper = function(totalWidth, paddingChar, isRightPadded)
{
    if ( this.length < totalWidth) {
        var paddingString = new String();
        for (let i = 1; i <= (totalWidth - this.length); i++) {
            paddingString += paddingChar;
        }

        if ( isRightPadded ) {
            return (this + paddingString);
        } else {
            return (paddingString + this);
        }
    } else {
        return this;
    }
}

module.exports = String.prototype;