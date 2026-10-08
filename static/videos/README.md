# WARPED website videos

Add web-ready MP4 clips with this layout:

```text
static/videos/<task-id>/human-demo.mp4
static/videos/<task-id>/robot-render.mp4
static/videos/<task-id>/robot-rollout.mp4
```

Supported task IDs are `rotate-box`, `pour-mug`, `bottle-rack`, `wipe-brush`, and `can-on-plate`.

After adding a clip, set the matching `null` field in `static/js/site.js` to its relative path. Only media for the currently selected task is loaded.
