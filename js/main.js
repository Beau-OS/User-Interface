let apps = {
  "com.google.chromium": {
    "full-name": "Google Chromium",
    "short-name": "Chromium",
    "developer": "Google",
    "icon": "com.google.chromium.png",
    "url": "https://www.chromium.org/Home",
    "description": "Chromium is an open-source browser project that aims to build a safer, faster, and more stable way " +
      "for all users to experience the web.",
    "categories": ["internet", "web"],
    "tags": ["browser", "web", "internet"],
  },
  "com.adobe.creative-cloud": {
    "full-name": "Adobe Creative Cloud",
    "short-name": "Creative Cloud",
    "developer": "Adobe",
    "icon": "com.adobe.creative-cloud.png",
    "url": "https://www.adobe.com/creativecloud.html",
    "description": "Adobe Creative Cloud is a collection of desktop and mobile apps and services for photography, design, video, web, UX, and more.",
    "categories": ["graphics", "design", "video"],
    "tags": ["photoshop", "illustrator", "indesign", "lightroom", "xd", "after-effects", "premiere-pro", "audition",
      "photoshop-lightroom", "photoshop-illustrator", "photoshop-indesign", "photoshop-lightroom-illustrator",
      "photoshop-lightroom-indesign", "photoshop-illustrator-indesign", "photoshop-lightroom-illustrator-indesign"
    ],
  },
  "com.spotify.client": {
    "full-name": "Spotify",
    "short-name": "Spotify",
    "developer": "Spotify",
    "icon": "com.spotify.client.png",
    "url": "https://www.spotify.com/",
    "description": "Spotify is a digital music service that gives you access to millions of songs.",
    "categories": ["music", "audio"],
    "tags": ["music", "audio", "streaming"],
  },
  "com.discord.discord": {
    "full-name": "Discord",
    "short-name": "Discord",
    "developer": "Discord",
    "icon": "com.discord.discord.png",
    "url": "https://discordapp.com/",
    "description": "Discord is a free and secure all-in-one voice+text app designed for gamers that works on your desktop and phone.",
    "categories": ["communication", "chat"],
    "tags": ["chat", "messaging", "voice", "text"],
  },
  "com.kde.dolphin": {
    "full-name": "Dolphin",
    "short-name": "Dolphin",
    "developer": "KDE",
    "icon": "com.kde.dolphin.png",
    "url": "https://www.kde.org/applications/system/org.kde.dolphin/",
    "description": "Dolphin is a file manager for KDE Plasma.",
    "categories": ["system", "file-manager"],
    "tags": ["file-manager", "file", "manager", "system"],
  },
  "com.microsoft.edge": {
    "full-name": "Microsoft Edge",
    "short-name": "Edge",
    "developer": "Microsoft",
    "icon": "com.microsoft.edge.png",
    "url": "https://www.microsoft.com/en-us/windows/microsoft-edge",
    "description": "Microsoft Edge is a web browser developed by Microsoft.",
    "categories": ["internet", "web"],
    "tags": ["browser", "web", "internet"],
  }
}

const screenWidth = window.innerWidth;
// =====================================================================================================================
// WINDOW MANAGER
// =====================================================================================================================
let windows = [];
let activeWindow = null;

function moveWindow(windowId, x, y) {
  let window = document.getElementById(windowId);
  window.style.left = x + "px";
  window.style.top = y + "px";

  // prevent the window from going above y = 32
  if (parseInt(window.style.top) < 32) {
    window.style.top = "32px";
  }

  // prevent the window titlebar from going below y = 0
  if (parseInt(window.style.top) > 1048) {
    window.style.top = "1050px";
  }

  // prevent the window from going off the left side of the screen
  if (parseInt(window.style.left) < 0) {
    window.style.left = "0px";
  }

  // prevent the window from going off the right side of the screen
  if (parseInt(window.style.left) > screenWidth - 16) {
    window.style.left = screenWidth - 32 + "px";
  }

  // move window to top
  let windowIndex = windows.indexOf(windowId);
  windows.splice(windowIndex, 1);
  windows.push(windowId);
  for (let i = 0; i < windows.length; i++) {
    let window = document.getElementById(windows[i]);
    window.style.zIndex = i;
  }
}

function closeWindow(windowId) {
  let window = document.getElementById(windowId);
  window.classList.add("window-disappear");
  window.addEventListener("animationend", function () {
    window.remove();
    windows.splice(windows.indexOf(windowId), 1);
  })
}

function createWindow(appId) {

  console.log("Creating window for " + appId);

  // Get app info
  let app = apps[appId];
  let randomString = Math.random().toString(36).substring(7);

  // Create window
  let window = document.createElement("div");
  window.className = "window";
  window.id = `window-${appId}-${randomString}`;
  window.style.zIndex = (windows.length + 1).toString();

  // Create window header
  let windowHeader = document.createElement("div");
  windowHeader.className = "title";
  windowHeader.innerHTML = app["full-name"];

  let windowControls = document.createElement("div");
  windowControls.className = "window-title-controls";

  // Create window close button
  let windowCloseButton = document.createElement("div");
  windowCloseButton.className = "window-title-control-close";

  // Create window minimize button
  let windowMinimizeButton = document.createElement("div");
  windowMinimizeButton.className = "window-title-control-minimize";

  // Create window maximize button
  let windowMaximizeButton = document.createElement("div");
  windowMaximizeButton.className = "window-title-control-maximize";

  // Create window content
  let windowContent = document.createElement("div");
  windowContent.className = "content";
  windowContent.innerHTML = "Hello world!";

  // Add all elements to window
  window.appendChild(windowHeader);
  windowHeader.appendChild(windowControls);
  windowControls.appendChild(windowCloseButton);
  windowControls.appendChild(windowMinimizeButton);
  windowControls.appendChild(windowMaximizeButton);
  window.appendChild(windowContent);

  // Put it in the center of the screen
  window.style.left = `calc(50% - ${window.offsetWidth / 2}px)`;
  window.style.top = `calc(50% - ${window.offsetHeight / 2}px)`;


  windows.push(window);
  document.body.appendChild(window);

  // Play window-appear animation
  window.classList.add("window-appear");
  // Remove window-appear animation class after animation is done
  window.addEventListener("animationend", function () {
    window.classList.remove("window-appear");
  })

  // Add event listeners
  windowCloseButton.addEventListener("click", function () {
    closeWindow(window.id);
  })

// Make window draggable
  windowHeader.addEventListener("mousedown", function (e) {
    let offset = [window.offsetLeft - e.clientX, window.offsetTop - e.clientY];

    function moveHandler(e) {
      moveWindow(window.id, e.clientX + offset[0], e.clientY + offset[1]);
    }

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", function () {
      document.removeEventListener("mousemove", moveHandler);
    });
  });

}

// When a window clicks a window, make it active
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("window" || "title" || "window-title-controls")) {
    activeWindow = e.target;
    activeWindow.style.zIndex = (windows.length + 1).toString();
  }
});

function listWindows() {
  for (let i = 0; i < windows.length; i++) {
    // console.log(windows[i]);
  }
}


// =====================================================================================================================
// boring
// =====================================================================================================================

function populateAppsBar() {
  let appsBar = document.getElementById("apps");
  for (let appId in apps) {
    // create div
    let appDiv = document.createElement("div");
    appDiv.className = "app-item";
    appDiv.id = appId;
    // create icon
    let appIcon = document.createElement("img");
    appIcon.className = "app-icon";
    appIcon.src = "img/apps/" + appId + ".png";
    appDiv.appendChild(appIcon);

    // Add app to apps bar
    appsBar.appendChild(appDiv);

    // Add click event
    appDiv.addEventListener("click", function () {
      createWindow(appId);
    });

  }
}

function updateSystemInfo() {
  const elements = {
    "wifi": document.getElementById("wifi"),
    "battery": document.getElementById("battery"),
    "time": document.getElementById("clock"),
  }

  // Get local time
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();

  // Add leading zero to minutes & hours
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }

  // Update time
  elements.time.innerHTML = hours + ":" + minutes;

  // ====================
  // Update battery
  // ====================

  // Get battery info
  let battery = navigator.getBattery();
  battery.then(function (battery) {
    // Get battery percentage
    let batteryPercentage = Math.round(battery.level * 100);
    // Update battery icon
    elements.battery.innerHTML = batteryPercentage + "%";
  });

  // ====================
  // Update wifi
  // ====================

  // Get wifi info
  let wifi = navigator.connection;
  let effectiveType = wifi.effectiveType;

  // Set text
  elements.wifi.innerHTML = effectiveType.toUpperCase();

}

updateSystemInfo();
populateAppsBar()

// Update system info every second
setInterval(updateSystemInfo, 1000);
