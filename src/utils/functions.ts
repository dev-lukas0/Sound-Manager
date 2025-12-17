/**
 * Fades in a Sound
 * @param player AudioPlayer
 * @param targetVolume Target volume
 * @param duration Duration
 */
export function fadeIn(player: AudioPlayer, targetVolume: number, duration: number) {
    player.Volume = 0;
    player.Play();

    const steps = 20;
    task.spawn(() => {
        for (let i = 0; i <= steps; i++) {
            player.Volume = (i / steps) * targetVolume;
            task.wait(duration / steps);
        }
    });
}

/**
 * Smoothly fades out a Sound
 * @param player AudioPlayer
 * @param duration Duration
 */
export function fadeOut(player: AudioPlayer, duration: number) {
    const startVolume = player.Volume ?? 1;
    const steps = 20;
    const interval = duration / steps;

    task.spawn(() => {
        for (let i = steps; i >= 0; i--) {
            player.Volume = (i / steps) * startVolume;
            task.wait(interval);
        }
        player.Stop();
    })
}