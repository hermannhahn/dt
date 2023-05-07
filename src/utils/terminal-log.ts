import { Icons } from 'utils/icon-text'

export class terminal {
	public static log(icon: any, ...text: any) {
		const msgIcon = new Icons(icon)
		const msg = text !== undefined ? ' ' + text : ''
		console.log(msgIcon + msg)
	}

	public static logInline(icon: any, text?: any) {
		const msgIcon = new Icons(icon)
		const msg = text !== undefined ? ' ' + text : ''
		process.stdout.write(msgIcon + msg)
	}

	public static label(color: any, text: any) {
		// green color
		if (color === 'green') {
			console.log(' [\x1b[32m' + text + '\x1b[0m]')
		}
		// red color
		if (color === 'red') {
			console.log(' [\x1b[31m' + text + '\x1b[0m]')
		}
		// yellow color
		if (color === 'yellow') {
			console.log(' [\x1b[33m' + text + '\x1b[0m]')
		}
		// blue color
		if (color === 'blue') {
			console.log(' [\x1b[34m' + text + '\x1b[0m]')
		}
		// magenta color
		if (color === 'magenta') {
			console.log(' [\x1b[35m' + text + '\x1b[0m]')
		}
		// cyan color
		if (color === 'cyan') {
			console.log(' [\x1b[36m' + text + '\x1b[0m]')
		}
		// orange color
		if (color === 'orange') {
			console.log(' [\x1b[33m' + text + '\x1b[0m]')
		}
		// white color
		if (color === 'white') {
			console.log(' [\x1b[37m' + text + '\x1b[0m]')
		}
		// gray color
		if (color === 'gray') {
			console.log(' [\x1b[90m' + text + '\x1b[0m]')
		}
	}

	public static fail(...text: any) {
		this.log('fail', text)
	}

	public static success(...text: any) {
		this.log('success', text)
	}

	public static done(...text: any) {
		this.log('done', text)
	}

	public static error(...text: any) {
		this.log('error', text)
	}

	public static warn(...text: any) {
		this.log('warn', text)
	}

	public static info(...text: any) {
		this.log('info', text)
	}

	public static init(...text: any) {
		this.log('init', text)
	}

	public static debug(...text: any) {
		this.log('debug', ...text)
		process.exit(0)
	}

	public static bug(...text: any) {
		this.log('bug', text)
	}

	public static green(...text: any) {
		process.stdout.write('\x1b[32m' + text + '\x1b[0m')
	}

	public static red(...text: any) {
		process.stdout.write('\x1b[31m' + text + '\x1b[0m')
	}

	public static yellow(...text: any) {
		process.stdout.write('\x1b[33m' + text + '\x1b[0m')
	}

	public static black(...text: any) {
		process.stdout.write('\x1b[30m' + text + '\x1b[0m')
	}

	public static orange(...text: any) {
		process.stdout.write('\x1b[33m' + text + '\x1b[0m')
	}

	public static blue(...text: any) {
		process.stdout.write('\x1b[34m' + text + '\x1b[0m')
	}

	public static magenta(...text: any) {
		process.stdout.write('\x1b[35m' + text + '\x1b[0m')
	}

	public static cyan(...text: any) {
		process.stdout.write('\x1b[36m' + text + '\x1b[0m')
	}

	public static white(...text: any) {
		process.stdout.write('\x1b[37m' + text + '\x1b[0m')
	}

	public static gray(...text: any) {
		process.stdout.write('\x1b[90m' + text + '\x1b[0m')
	}

	public static grey(...text: any) {
		process.stdout.write('\x1b[90m' + text + '\x1b[0m')
	}

	public static bold(...text: any) {
		process.stdout.write('\x1b[1m' + text + '\x1b[0m')
	}

	public static italic(...text: any) {
		process.stdout.write('\x1b[3m' + text + '\x1b[0m')
	}

	public static underline(...text: any) {
		process.stdout.write('\x1b[4m' + text + '\x1b[0m')
	}

	public static inverse(...text: any) {
		process.stdout.write('\x1b[7m' + text + '\x1b[0m')
	}

	public static strikethrough(...text: any) {
		process.stdout.write('\x1b[9m' + text + '\x1b[0m')
	}

	public static hidden(...text: any) {
		process.stdout.write('\x1b[8m' + text + '\x1b[0m')
	}

	public static reset() {
		process.stdout.write('\x1b[0m')
	}

	public static clear() {
		console.clear()
	}

	public static clearLine() {
		console.log('\x1b[2K')
	}

	public static cursorTo(x: number, y?: number) {
		console.log('\x1b[' + (y || '') + ';' + x + 'f')
	}

	public static cursorMove(x: number, y?: number) {
		console.log('\x1b[' + (y || '') + ';' + x + 'f')
	}

	public static cursorUp(count?: number) {
		console.log('\x1b[' + (count || '') + 'A')
	}

	public static cursorDown(count?: number) {
		console.log('\x1b[' + (count || '') + 'B')
	}

	public static cursorForward(count?: number) {
		console.log('\x1b[' + (count || '') + 'C')
	}

	public static cursorBackward(count?: number) {
		console.log('\x1b[' + (count || '') + 'D')
	}

	public static cursorLeft(count?: number) {
		console.log('\x1b[' + (count || '') + 'D')
	}

	public static cursorRight(count?: number) {
		console.log('\x1b[' + (count || '') + 'C')
	}

	public static cursorNextLine(count?: number) {
		console.log('\x1b[' + (count || '') + 'E')
	}

	public static cursorPrevLine(count?: number) {
		console.log('\x1b[' + (count || '') + 'F')
	}
}
