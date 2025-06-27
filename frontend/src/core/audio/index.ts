import { Howl, Howler } from 'howler';

export class Audio {
    private sound: Howl | null = null;

    constructor() {}

    play(file: string): this {
        this.sound = new Howl({
            src: [`${file}`],
            onloaderror: (id, error) => {
                console.error(`CandySang: Error loading sound: ${error}`);
            },
        });
        
        this.sound.play();
        return this;
    }

    setVolume(vol: number): this {
        if (this.sound) {
            if (vol < 0) {
                this.sound.volume(0); 
                return this;
            }

            this.sound.volume(vol);
        }
        return this;
    }
    
    pause(): this {
        if (this.sound) {
            this.sound.pause();
        }
        return this;
    }

    stop(): this {
        if (this.sound) {
            this.sound.stop();
        }
        return this;
    }

    resume(): this {
        if (this.sound) {
            this.sound.play();
        }
        return this;
    }

    setGlobalVol(vol: number): this {
        Howler.volume(vol);
        return this;
    }
} 