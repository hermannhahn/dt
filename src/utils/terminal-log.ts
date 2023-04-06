import { Icons } from "utils/icon-text"

export class terminal {
	public static log(icon: string, text: any) {
		const msgIcon = new Icons(icon)
		const msg = text !== undefined ? " " + text : ""
		console.log(msgIcon.print() + msg)
	}

	public static logInline(icon: string, text?: string) {
		const msgIcon = new Icons(icon)
		const msg = text ? " " + text : ""
		process.stdout.write(msgIcon.print() + msg)
	}

	public static success(text?: string) {
		this.log("success", text)
	}

	public static error(text?: string) {
		this.log("error", text)
	}

	public static warn(text?: string) {
		this.log("warn", text)
	}

	public static info(text?: string) {
		this.log("info", text)
	}

	public static debug(text?: string) {
		this.log("debug", text)
	}

	public static bug(text?: string) {
		this.log("bug", text)
	}
	// green color: \x1b[32m
	public static green(text: string) {
		process.stdout.write("\x1b[32m" + text + "\x1b[0m")
	}

	public static red(text: string) {
		process.stdout.write("\x1b[31m" + text + "\x1b[0m")
	}

	public static yellow(text: string) {
		process.stdout.write("\x1b[33m" + text + "\x1b[0m")
	}

	public static black(text: string) {
		process.stdout.write("\x1b[30m" + text + "\x1b[0m")
	}

	public static orange(text: string) {
		process.stdout.write("\x1b[33m" + text + "\x1b[0m")
	}

	public static blue(text: string) {
		process.stdout.write("\x1b[34m" + text + "\x1b[0m")
	}

	public static magenta(text: string) {
		process.stdout.write("\x1b[35m" + text + "\x1b[0m")
	}

	public static cyan(text: string) {
		process.stdout.write("\x1b[36m" + text + "\x1b[0m")
	}

	public static white(text: string) {
		process.stdout.write("\x1b[37m" + text + "\x1b[0m")
	}

	public static gray(text: string) {
		process.stdout.write("\x1b[90m" + text + "\x1b[0m")
	}

	public static grey(text: string) {
		process.stdout.write("\x1b[90m" + text + "\x1b[0m")
	}

	public static bold(text: string) {
		process.stdout.write("\x1b[1m" + text + "\x1b[0m")
	}

	public static italic(text: string) {
		process.stdout.write("\x1b[3m" + text + "\x1b[0m")
	}

	public static underline(text: string) {
		process.stdout.write("\x1b[4m" + text + "\x1b[0m")
	}

	public static inverse(text: string) {
		process.stdout.write("\x1b[7m" + text + "\x1b[0m")
	}

	public static strikethrough(text: string) {
		process.stdout.write("\x1b[9m" + text + "\x1b[0m")
	}

	public static hidden(text: string) {
		process.stdout.write("\x1b[8m" + text + "\x1b[0m")
	}

	public static reset() {
		process.stdout.write("\x1b[0m")
	}

	public static clear() {
		console.clear()
	}

	public static clearLine() {
		console.log("\x1b[2K")
	}

	public static cursorTo(x: number, y?: number) {
		console.log("\x1b[" + (y || "") + ";" + x + "f")
	}

	public static cursorMove(x: number, y?: number) {
		console.log("\x1b[" + (y || "") + ";" + x + "f")
	}

	public static cursorUp(count?: number) {
		console.log("\x1b[" + (count || "") + "A")
	}

	public static cursorDown(count?: number) {
		console.log("\x1b[" + (count || "") + "B")
	}

	public static cursorForward(count?: number) {
		console.log("\x1b[" + (count || "") + "C")
	}

	public static cursorBackward(count?: number) {
		console.log("\x1b[" + (count || "") + "D")
	}

	public static cursorLeft(count?: number) {
		console.log("\x1b[" + (count || "") + "D")
	}

	public static cursorRight(count?: number) {
		console.log("\x1b[" + (count || "") + "C")
	}

	public static cursorNextLine(count?: number) {
		console.log("\x1b[" + (count || "") + "E")
	}

	public static cursorPrevLine(count?: number) {
		console.log("\x1b[" + (count || "") + "F")
	}
}
