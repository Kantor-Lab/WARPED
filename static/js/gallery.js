(() => {
  const tasks = {
    "rotate-box": {
      humanDemo: "static/videos/rotate-box/human-demo",
      robotRender: "static/videos/rotate-box/robot-render",
      robotRollout: "static/videos/rollouts/rotate-box",
    },
    "pour-mug": {
      humanDemo: "static/videos/pour-mug/human-demo",
      robotRender: "static/videos/pour-mug/robot-render",
      robotRollout: "static/videos/rollouts/pour-mug",
    },
    "bottle-from-rack": {
      humanDemo: "static/videos/bottle-from-rack/human-demo",
      robotRender: "static/videos/bottle-from-rack/robot-render",
      robotRollout: "static/videos/rollouts/bottle-from-rack",
    },
    "wipe-brush": {
      humanDemo: "static/videos/wipe-brush/human-demo",
      robotRender: "static/videos/wipe-brush/robot-render",
      robotRollout: "static/videos/rollouts/wipe-brush",
    },
    "can-on-plate": {
      humanDemo: "static/videos/can-on-plate/human-demo",
      robotRender: "static/videos/can-on-plate/robot-render",
      robotRollout: "static/videos/rollouts/can-on-plate",
    },
    "open-microwave": {
      humanDemo: "static/videos/open-microwave/human-demo",
      robotRender: "static/videos/open-microwave/robot-render",
      robotRollout: "static/videos/rollouts/open-microwave",
    },
  };

  const taskSelect = document.querySelector("#example-task");
  const humanDemo = document.querySelector("#human-demo-video");
  const robotRender = document.querySelector("#robot-render-video");
  const rolloutSelect = document.querySelector("#rollout-task");
  const robotRollout = document.querySelector("#robot-rollout-video");

  function loadVideo(video, path) {
    video.pause();
    video.querySelector('source[type="video/webm"]').src = `${path}.webm`;
    video.querySelector('source[type="video/mp4"]').src = `${path}.mp4`;
    video.load();
  }

  taskSelect.addEventListener("change", () => {
    const task = tasks[taskSelect.value];
    loadVideo(humanDemo, task.humanDemo);
    loadVideo(robotRender, task.robotRender);
  });

  rolloutSelect.addEventListener("change", () => {
    const task = tasks[rolloutSelect.value];
    loadVideo(robotRollout, task.robotRollout);
  });
})();
