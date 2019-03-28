# Wikisub

A collaborative HTML5 editor for closed-captioning.

## Important note

This project is currently on hold. It has originally been intended to help the fansubbing community to ease the process of subtitling videos: they wouldn't have to pass the subtitles file anymore between the timer, the translator, the proof-reader, etc. Everything would be incrementally backed on a central database. Think of it as Git for subtitling videos.

The other advantage of this idea is that every website that uses the WebVTT file served on this central server would get the latest version of the subtitles automatically (WebVTT is the standard file format for HTML5 video subtitles). For example, every website embedding this code would have the latest version of the subtitles (changes can be made to the subtitles and the WebVTT is regenerated automatically):

```
<video src="myVideo.mp4">
  <!-- We assume wikisub.com would be the server URL -->
  <track src="http://wikisub.com/webvtt/myVideo.vtt" />
</video>
```

---

But this project was made redundant for several reasons:

1. Because it wouldn't help fansubbers that much. Their current organization is enough smoothrunning, they use Dropbox or something similar to pass each other the ASS file.

2. Oh because I forgot to mention, the subtitle file HAS to be an ASS file, as WebVTT styling (which is by the way still in specification and hence poorly-supported on every browser) wouldn't be able to create complex karaokes like ASS. The problem is, you can only read WebVTT files with HTML5 videos and not ASS. Fortunately, there exist several libraries like [AnimeOpening](anime-opening), [Subtitles Octopus](subtitles-octopus) or [libjass](libjass) that allow you to use ASS subtitles on top of a browser video (but it remains not perfect).

3. It would be __very__ difficult to recreate an online ASS editor as complete as [Aegisub](aegisub).

4. Fansubbers don't need a streaming platform that would use their subtitles files. They mux the subtitles and the video together in a MKV file and share their work using torrents. They use a customizable video player that allow them to control the playback or the filters of the video for instance.

5. There already exist numerous online subtitling tools like [Closed Caption Creator](closed-caption-creator) or [Kapwing's](kapwing) that are far more complete than this one. Projects like [Amara](amara) even integrate collaborativeness (kind of) like I wanted for this project.

If not for the fansubbers, this tool wouldn't be useful to many people, so I decided to suspend it. I had some original ideas for this project though:

- Decentralize the storage of the VTT file using [IPFS](ipfs).

- Get the amplitude diagram of the audio track like with Youtube subtitling tool. This would have been made client-side using the [Web Audio API](web-audio-api).

  [//]: # (Misc)
  [aegisub]: http://www.aegisub.org/
  [web-audio-api]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
  [ipfs]: https://ipfs.io/

  [//]: # (GitHub libraries for reading ASS on browser)
  [anime-opening]: https://github.com/AniDevTwitter/animeopenings/blob/master/JS/subtitles.js
  [subtitles-octopus]: https://github.com/Dador/JavascriptSubtitlesOctopus
  [libjass]: https://github.com/Arnavion/libjass

  [//]: # (Already existing online subtitling tools)
  [closed-caption-creator]: https://app.closedcaptioncreator.com
  [kapwing]: https://www.kapwing.com/caption-video
  [amara]: https://amara.org

