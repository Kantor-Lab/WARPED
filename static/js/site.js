(() => {
  "use strict";

  // Add a relative media path in place of null when each clip is ready.
  // The expected filename for every slot is shown in the page placeholder.
  const TASKS = Object.freeze([
    Object.freeze({
      id: "rotate-box",
      label: "Rotate Box",
      description: "Rotate a box 90° onto a new face from varied starting positions.",
      humanDemo: null,
      robotRender: null,
      robotRollout: null,
    }),
    Object.freeze({
      id: "pour-mug",
      label: "Pour Mug",
      description: "Grasp a mug by its handle and complete a controlled pouring motion.",
      humanDemo: null,
      robotRender: null,
      robotRollout: null,
    }),
    Object.freeze({
      id: "bottle-rack",
      label: "Bottle from Rack",
      description: "Retrieve a bottle from the middle shelf of a dish rack under spatial constraints.",
      humanDemo: null,
      robotRender: null,
      robotRollout: null,
    }),
    Object.freeze({
      id: "wipe-brush",
      label: "Wipe Brush",
      description: "Pick up a small brush and wipe a plate while maintaining accurate contact.",
      humanDemo: null,
      robotRender: null,
      robotRollout: null,
    }),
    Object.freeze({
      id: "can-on-plate",
      label: "Can on Plate",
      description: "Pick up a can and place it on a plate whose position varies across trials.",
      humanDemo: null,
      robotRender: null,
      robotRollout: null,
    }),
  ]);

  const MEDIA = Object.freeze({
    humanDemo: Object.freeze({
      filename: "human-demo.mp4",
      emptyLabel: "Human demonstration coming soon",
      unavailableLabel: "Human demonstration unavailable",
      ariaLabel: "human demonstration",
    }),
    robotRender: Object.freeze({
      filename: "robot-render.mp4",
      emptyLabel: "Robot render coming soon",
      unavailableLabel: "Robot render unavailable",
      ariaLabel: "robot render",
    }),
    robotRollout: Object.freeze({
      filename: "robot-rollout.mp4",
      emptyLabel: "Robot rollout coming soon",
      unavailableLabel: "Robot rollout unavailable",
      ariaLabel: "robot rollout",
    }),
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Exposed for easy inspection and later media updates from the browser console.
  window.WARPED_TASKS = TASKS;

  function expectedPath(task, role) {
    return `static/videos/${task.id}/${MEDIA[role].filename}`;
  }

  function stopVideo(video) {
    video.pause();
    video.onerror = null;
    video.removeAttribute("src");
    video.load();
    video.hidden = true;
  }

  function showPlaceholder(card, task, role, unavailable = false) {
    const placeholder = card.querySelector(".media-placeholder");
    const video = card.querySelector("video");

    stopVideo(video);
    placeholder.querySelector(".placeholder-task").textContent = task.label;
    placeholder.querySelector(".placeholder-title").textContent = unavailable
      ? MEDIA[role].unavailableLabel
      : MEDIA[role].emptyLabel;
    placeholder.querySelector(".placeholder-path").textContent = expectedPath(task, role);
    placeholder.hidden = false;
    card.dataset.mediaState = unavailable ? "unavailable" : "placeholder";
  }

  function showVideo(card, task, role, source) {
    const placeholder = card.querySelector(".media-placeholder");
    const video = card.querySelector("video");

    stopVideo(video);
    placeholder.hidden = true;
    video.hidden = false;
    video.src = source;
    video.setAttribute("aria-label", `${task.label} ${MEDIA[role].ariaLabel}`);
    video.autoplay = !reducedMotion.matches;
    video.onerror = () => showPlaceholder(card, task, role, true);
    video.load();
    card.dataset.mediaState = "video";

    if (!reducedMotion.matches) {
      const playback = video.play();
      if (playback && typeof playback.catch === "function") {
        playback.catch(() => {
          // Controls remain available if browser autoplay policy blocks playback.
        });
      }
    }
  }

  function renderMedia(card, task, role) {
    const source = task[role];
    if (typeof source === "string" && source.trim() !== "") {
      showVideo(card, task, role, source);
      return;
    }
    showPlaceholder(card, task, role);
  }

  function populateSelect(select) {
    const fragment = document.createDocumentFragment();
    TASKS.forEach((task) => {
      const option = document.createElement("option");
      option.value = task.id;
      option.textContent = task.label;
      fragment.append(option);
    });
    select.replaceChildren(fragment);
  }

  function setupGallery({ selectId, descriptionId, roles }) {
    const select = document.getElementById(selectId);
    const description = document.getElementById(descriptionId);
    if (!select || !description) return;

    const cards = roles.map((role) => ({
      role,
      card: document.querySelector(`[data-media-slot="${role}"]`),
    }));

    const render = () => {
      const task = TASKS.find((candidate) => candidate.id === select.value) ?? TASKS[0];
      description.textContent = task.description;
      cards.forEach(({ card, role }) => {
        if (card) renderMedia(card, task, role);
      });
    };

    populateSelect(select);
    select.addEventListener("change", render);
    render();
  }

  document.querySelectorAll('[aria-disabled="true"]').forEach((element) => {
    element.addEventListener("click", (event) => event.preventDefault());
  });

  setupGallery({
    selectId: "render-task-select",
    descriptionId: "render-task-description",
    roles: ["humanDemo", "robotRender"],
  });

  setupGallery({
    selectId: "rollout-task-select",
    descriptionId: "rollout-task-description",
    roles: ["robotRollout"],
  });
})();
