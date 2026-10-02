// ==================================================
// 라떼마을 - game.js
// 농사 + 낚시 + 상점 + 가방 + 보관함 + 축산 농장
// ==================================================


// ==================================================
// 1. HTML 요소
// ==================================================

const inventoryButton = document.querySelector("#inventoryButton");
const inventoryPanel = document.querySelector("#inventoryPanel");
const inventoryClose = document.querySelector("#inventoryClose");
const inventoryGrid = document.querySelector(".inventory-grid");
const inventorySlotCount = document.querySelector("#inventorySlotCount");

const sleepOverlay =
  document.querySelector("#sleepOverlay");

const dayChangeOverlay =
  document.querySelector(
    "#dayChangeOverlay"
  );

const dayChangeContent =
  document.querySelector(
    "#dayChangeContent"
  );

const homeButton = document.querySelector("#homeButton");
const homeSection = document.querySelector("#homeSection");
const homeClose = document.querySelector("#homeClose");
const homeInventoryGrid = document.querySelector("#homeInventoryGrid");
const homeInventoryCount = document.querySelector("#homeInventoryCount");
const storageGrid = document.querySelector("#storageGrid");
const storageCount = document.querySelector("#storageCount");

const farmButton = document.querySelector("#farmButton");
const farmSection = document.querySelector("#farmSection");
const plotCards = document.querySelectorAll(".plot-card");

const animalFarmButton = document.querySelector("#animalFarmButton");
const animalFarmSection = document.querySelector("#animalFarmSection");
const animalFarmClose = document.querySelector("#animalFarmClose");
const animalFarmLocked = document.querySelector("#animalFarmLocked");
const animalFarmUnlocked = document.querySelector("#animalFarmUnlocked");
const animalFarmGold = document.querySelector("#animalFarmGold");
const unlockAnimalFarmButton =
  document.querySelector("#unlockAnimalFarmButton");

const animalFarmWheatCount =
  document.querySelector("#animalFarmWheatCount");

const chickenEmptyState =
  document.querySelector("#chickenEmptyState");

const chickenOwnedState =
  document.querySelector("#chickenOwnedState");

const adoptChickenButton =
  document.querySelector("#adoptChickenButton");

const chickenStatus =
  document.querySelector("#chickenStatus");

const chickenActionButton =
  document.querySelector("#chickenActionButton");

const gameClock =
  document.querySelector("#gameClock");


const sleepButton =
  document.querySelector("#sleepButton");


function updateSleepButton() {

  if (!sleepButton) {
    return;
  }

  const hasBed =
    hasPlacedFurniture(
      "simple-bed"
    );

  if (hasBed) {

    sleepButton.disabled = false;
    sleepButton.textContent =
      "💤 잠자기";

    sleepButton.classList.remove(
      "bed-required"
    );

  } else {

    sleepButton.disabled = true;
    sleepButton.textContent =
      "🔒 침대 필요";

    sleepButton.classList.add(
      "bed-required"
    );

  }
}



// 소

const cowEmptyState =
  document.querySelector("#cowEmptyState");

const cowOwnedState =
  document.querySelector("#cowOwnedState");

const adoptCowButton =
  document.querySelector("#adoptCowButton");

const cowStatus =
  document.querySelector("#cowStatus");

const cowActionButton =
  document.querySelector("#cowActionButton");

const pondButton = document.querySelector("#pondButton");
const pondSection = document.querySelector("#pondSection");
const pondClose = document.querySelector("#pondClose");
const fishingButton = document.querySelector("#fishingButton");
const fishingStatus = document.querySelector("#fishingStatus");
const pondVisual = document.querySelector("#pondVisual");

// ========================================
// 숲
// ========================================

const forestButton =
  document.querySelector("#forestButton");

const forestSection =
  document.querySelector("#forestSection");

const forestClose =
  document.querySelector("#forestClose");

const gatheringButton =
  document.querySelector("#gatheringButton");

const gatheringStatus =
  document.querySelector("#gatheringStatus");

const forestVisual =
  document.querySelector("#forestVisual");

const shopButton = document.querySelector("#shopButton");
const shopSection = document.querySelector("#shopSection");
const shopClose = document.querySelector("#shopClose");

const buyButtons = document.querySelectorAll(".buy-button");
const sellOneButtons = document.querySelectorAll(".sell-one-button");
const sellAllButtons = document.querySelectorAll(".sell-all-button");
const shopOwnedLabels = document.querySelectorAll(".shop-owned");

const headerGold = document.querySelector("#headerGold");
const statusGold = document.querySelector("#statusGold");

const statusLevel = document.querySelector("#statusLevel");
const statusXP = document.querySelector("#statusXP");
const statusJob = document.querySelector("#statusJob");
const strawberrySeedShopCard =
  document.querySelector("#strawberrySeedShopCard");

const rancherProcessingArea =
  document.querySelector("#rancherProcessingArea");

const makeButterButton =
  document.querySelector("#makeButterButton");


// ========================================
// 공방 DOM
// ========================================

const workshopButton =
  document.querySelector("#workshopButton");

const workshopSection =
  document.querySelector("#workshopSection");

const workshopClose =
  document.querySelector("#workshopClose");

  
// ========================================
// 광산
// ========================================

const mineButton =
  document.querySelector("#mineButton");

const mineSection =
  document.querySelector("#mineSection");

const mineClose =
  document.querySelector("#mineClose");


const mineStatus =
  document.querySelector("#mineStatus");

const pickaxeIcon =
  document.querySelector("#pickaxeIcon");

const pickaxeName =
  document.querySelector("#pickaxeName");

const pickaxeUpgradeCost =
  document.querySelector("#pickaxeUpgradeCost");

const upgradePickaxeButton =
  document.querySelector("#upgradePickaxeButton");


const requestBoardButton =
  document.querySelector(
    "#requestBoardButton"
  );

const requestBoardSection =
  document.querySelector(
    "#requestBoardSection"
  );

const requestBoardClose =
  document.querySelector(
    "#requestBoardClose"
  );

const requestList =
  document.querySelector(
    "#requestList"
  );

// ========================================
// 의뢰 게시판 데이터
// ========================================

const requestNames = [
  "김감자",
  "박복실",
  "최춘배",
  "이말순",
  "한덕구",
  "오복자",
  "윤봉식",
  "장순이"
];


const requestItems = [

  {
    itemId: "carrot",
    min: 2,
    max: 6,
    goldPerItem: 25
  },

  {
    itemId: "potato",
    min: 2,
    max: 5,
    goldPerItem: 38
  },

  {
    itemId: "wheat",
    min: 3,
    max: 8,
    goldPerItem: 30
  },

  {
    itemId: "crucian",
    min: 1,
    max: 4,
    goldPerItem: 20
  },

  {
    itemId: "minnow",
    min: 1,
    max: 3,
    goldPerItem: 32
  },

  {
    itemId: "branch",
    min: 3,
    max: 8,
    goldPerItem: 8
  },

  {
    itemId: "herb",
    min: 2,
    max: 5,
    goldPerItem: 18
  },

  {
    itemId: "mushroom",
    min: 1,
    max: 4,
    goldPerItem: 25
  },

  {
    itemId: "berry",
    min: 1,
    max: 3,
    goldPerItem: 48
  },

  {
    itemId: "stone",
    min: 3,
    max: 8,
    goldPerItem: 10
  },

  {
    itemId: "copper-ore",
    min: 1,
    max: 4,
    goldPerItem: 35
  },

  // ========================================
// 진행도에 따라 등장하는 의뢰
// ========================================

// 축산
{
  itemId: "egg",
  min: 1,
  max: 4,
  goldPerItem: 45,
  unlock: () =>
    animalFarmUnlockedState === true
},

{
  itemId: "milk",
  min: 1,
  max: 3,
  goldPerItem: 55,
  unlock: () =>
    cowOwned === true
},


// 농부 전용
{
  itemId: "strawberry",
  min: 1,
  max: 4,
  goldPerItem: 65,
  unlock: () =>
    job === "farmer"
},


// 낚시꾼 전용
{
  itemId: "shrimp",
  min: 1,
  max: 3,
  goldPerItem: 60,
  unlock: () =>
    job === "fisher"
},


// 광산
{
  itemId: "iron-ore",
  min: 1,
  max: 4,
  goldPerItem: 50,
  unlock: () =>
    pickaxeLevel >= 1
},

{
  itemId: "gold-ore",
  min: 1,
  max: 3,
  goldPerItem: 85,
  unlock: () =>
    pickaxeLevel >= 2
},

{
  itemId: "gem",
  min: 1,
  max: 2,
  goldPerItem: 150,
  unlock: () =>
    pickaxeLevel >= 3
},

{
  itemId: "mysterious-ore",
  min: 1,
  max: 1,
  goldPerItem: 350,
  unlock: () =>
    pickaxeLevel >= 4
}

];

// ========================================
// 랜덤 의뢰 만들기
// ========================================

function createRandomRequest() {

  const name =
    requestNames[
      Math.floor(
        Math.random() *
        requestNames.length
      )
    ];


// 현재 플레이어가 받을 수 있는 의뢰만 추리기

const availableItems =
  requestItems.filter(
    (item) => {

      // unlock 조건이 없는 아이템은
      // 처음부터 등장 가능
      if (!item.unlock) {
        return true;
      }

      // 조건이 있는 아이템은
      // 현재 진행도를 확인
      return item.unlock();

    }
  );


const requestItem =
  availableItems[
    Math.floor(
      Math.random() *
      availableItems.length
    )
  ];


  const amount =
    Math.floor(
      Math.random() *
      (
        requestItem.max -
        requestItem.min +
        1
      )
    ) +
    requestItem.min;


  const goldReward =
    amount *
    requestItem.goldPerItem;


  const xpReward =
    Math.max(
      5,
      Math.round(
        goldReward / 10
      )
    );


  return {
    name: name,
    itemId: requestItem.itemId,
    amount: amount,
    goldReward: goldReward,
    xpReward: xpReward
  };

}

let villageRequests = [];


function generateRequests() {

  villageRequests = [
    createRandomRequest(),
    createRandomRequest(),
    createRandomRequest()
  ];

  renderRequests();

}


function renderRequests() {

  if (!requestList) {
    return;
  }


  requestList.innerHTML = "";


  villageRequests.forEach(
    (request, index) => {

      const info =
        itemData[request.itemId];


      const card =
        document.createElement(
          "div"
        );

      card.className =
        "request-card";


      card.innerHTML = `
        <div class="request-person">
          👤 ${request.name}
        </div>

        <p class="request-message">
          ${info.name}이(가) 좀 필요한데
          구해줄 수 있을까?
        </p>

        <div class="request-item">
          ${info.icon}
          ${info.name}
          ${request.amount}개
        </div>

        <div class="request-reward">
          보상 💰 ${request.goldReward}G
          · ⭐ ${request.xpReward} XP
        </div>

        <button
          class="request-complete-button"
          type="button"
          data-request-index="${index}"
        >
          📦 납품하기
        </button>
      `;


      requestList.appendChild(
        card
      );

    }
  );

}

// ========================================
// 의뢰 납품
// ========================================

requestList?.addEventListener(
  "click",
  (event) => {

    const button =
      event.target.closest(
        ".request-complete-button"
      );


    if (!button) {
      return;
    }


    const index =
      Number(
        button.dataset.requestIndex
      );


    const request =
      villageRequests[index];


    if (!request) {
      return;
    }


    const info =
      itemData[request.itemId];


    // ====================================
    // 아이템 수량 확인
    // ====================================

    const owned =
      getItemCount(
        request.itemId
      );


    if (
      owned <
      request.amount
    ) {

      showMessage(
        `${info.icon} ${info.name}이(가) ${request.amount - owned}개 더 필요해요!`
      );

      return;
    }


    // ====================================
    // 요구 아이템 납품
    // ====================================

    const removed =
      removeItem(
        request.itemId,
        request.amount
      );


    if (!removed) {
      return;
    }


    // ====================================
    // 보상 지급
    // ====================================

    gold +=
      request.goldReward;


    addXP(
      request.xpReward
    );


    updateGold();


    // ====================================
    // 완료한 자리만 새 의뢰 생성
    // ====================================

    villageRequests[index] =
      createRandomRequest();


    renderRequests();

    saveGame();


    showMessage(
      `📦 의뢰 완료! +${request.goldReward}G · +${request.xpReward} XP`
    );

  }
);

// ========================================
// 부엌
// ========================================

const cookButterPotatoButton =
  document.querySelector("#cookButterPotatoButton");

const cookStrawberryMilkButton =
  document.querySelector("#cookStrawberryMilkButton");

const cookMushroomButton =
  document.querySelector("#cookMushroomButton");

const cookBerryMilkButton =
  document.querySelector("#cookBerryMilkButton");

const jobSelectOverlay =
  document.querySelector("#jobSelectOverlay");

const jobCards =
  document.querySelectorAll(".job-card");


// 우클릭 메뉴

const itemContextMenu = document.querySelector("#itemContextMenu");
const contextItemIcon = document.querySelector("#contextItemIcon");
const contextItemName = document.querySelector("#contextItemName");
const contextItemCount = document.querySelector("#contextItemCount");
const contextMoveOne = document.querySelector("#contextMoveOne");
const contextMoveAll = document.querySelector("#contextMoveAll");
const contextCancel = document.querySelector("#contextCancel");


// ==================================================
// 2. 기본 설정
// ==================================================

const MAX_STACK = 30;
const INVENTORY_SLOTS = 12;
const STORAGE_SLOTS = 30;

const SAVE_KEY = "latteVillageSave";

const ANIMAL_FARM_PRICE = 2000;
const CHICKEN_PRICE = 300;
const COW_PRICE = 800;

// 테스트용:
// 닭이 밀을 먹고 달걀을 낳기까지 10초
const CHICKEN_PRODUCTION_TIME = 10000;
const COW_PRODUCTION_TIME = 10000;

let isDeletingSave = false;
let gold = 500;

let level = 1;
let xp = 0;

let job = null;
let jobUnlocked = false;

// ========================================
// 가구 인벤토리
// ========================================

let furnitureInventory = {};

// ========================================
// 게임 날짜 / 시간
// ========================================

let gameDay = 1;

// 오전 6시부터 하루 시작
let gameMinutes = 6 * 60;

let isDayChanging = false;

// 현실 1초마다 게임 속 10분 진행
const GAME_MINUTES_PER_TICK = 2;
const GAME_TICK_TIME = 1000;

let selectedItem = null;
let focusedItem = null;


// ========================================
// 곡괭이
// ========================================

// 0 = 낡은 곡괭이
// 1 = 구리 곡괭이
// 2 = 철 곡괭이
// 3 = 고급 곡괭이
// 4 = 장인의 곡괭이

let pickaxeLevel = 0;
const pickaxeData = [

  {
    name: "낡은 곡괭이",
    icon: "🪵"
  },

  {
    name: "구리 곡괭이",
    icon: "🟤",
    material: "copper-ore",
    materialAmount: 10,
    gold: 200
  },

  {
    name: "철 곡괭이",
    icon: "⚙️",
    material: "iron-ore",
    materialAmount: 10,
    gold: 500
  },

  {
    name: "고급 곡괭이",
    icon: "✨",
    material: "gold-ore",
    materialAmount: 8,
    gold: 1000
  },

  {
    name: "장인의 곡괭이",
    icon: "💎",
    material: "gem",
    materialAmount: 5,
    gold: 2000
  }

];


// 축산 농장 해금 여부

let animalFarmUnlockedState = false;
// 닭을 입양했는지
let chickenOwned = false;

// 닭이 달걀 생산을 시작한 시각
// 아직 생산 중이 아니면 null
let chickenProductionStartedAt = null;

// ============================================
// 소
// ============================================

// 소를 입양했는지

let cowOwned = false;

// 소가 우유 생산을 시작한 시각
// 아직 생산 중이 아니면 null

let cowProductionStartedAt = null;


// ==================================================
// 3. 아이템 데이터
// ==================================================

const itemData = {

  "carrot-seed": {
    name: "당근 씨앗",
    icon: "📦",
    selectable: true
  },

  "potato-seed": {
    name: "감자 씨앗",
    icon: "📦",
    selectable: true
  },

  "wheat-seed": {
    name: "밀 씨앗",
    icon: "📦",
    selectable: true
  },

  "cotton-seed": {

  name: "목화 씨앗",

  icon: "📦",

  selectable: true

},

"cotton": {

  name: "목화",

  icon: "☁️",

  selectable: false

},

  "strawberry-seed": {
    name: "딸기 씨앗",
    icon: "🍓",
    selectable: true
  },

  "carrot": {
    name: "당근",
    icon: "🥕",
    selectable: false
  },

  "potato": {
    name: "감자",
    icon: "🥔",
    selectable: false
  },

  "wheat": {
    name: "밀",
    icon: "🌾",
    selectable: false
  },

  "strawberry": {
    name: "딸기",
    icon: "🍓",
    selectable: false
  },

  "crucian": {
    name: "붕어",
    icon: "🐟",
    selectable: false
  },

  "minnow": {
    name: "송사리",
    icon: "🐠",
    selectable: false
  },

  "golden-crucian": {
    name: "황금붕어",
    icon: "✨",
    selectable: false
  },

  "shrimp": {
    name: "새우",
    icon: "🦐",
    selectable: false
  },

  "egg": {
    name: "달걀",
    icon: "🥚",
    selectable: false
  },
"milk": {

  name: "우유",

  icon: "🥛",

  selectable: false

},

"butter": {

  name: "버터",

  icon: "🧈",

  selectable: false

},

"stone": {
  name: "돌",
  icon: "🪨",
  selectable: false
},

"copper-ore": {
  name: "구리 광석",
  icon: "🟤",
  selectable: false
},

"iron-ore": {
  name: "철 광석",
  icon: "⚙️",
  selectable: false
},

"gold-ore": {
  name: "금 광석",
  icon: "🟡",
  selectable: false
},

"gem": {
  name: "보석",
  icon: "💎",
  selectable: false
},

"mysterious-ore": {
  name: "미지의 광물",
  icon: "🌌",
  selectable: false
},

"branch": {

  name: "나뭇가지",

  icon: "🪵",

  selectable: false

},

"herb": {

  name: "허브",

  icon: "🌿",

  selectable: false

},

"mushroom": {

  name: "버섯",

  icon: "🍄",

  selectable: false

},

"berry": {

  name: "베리",

  icon: "🫐",

  selectable: false

},

"butter-potato": {

  name: "버터감자",

  icon: "🥔",

  selectable: false

},

"strawberry-milk": {

  name: "딸기우유",

  icon: "🥤",

  selectable: false

},

"mushroom-stir-fry": {

  name: "버섯볶음",

  icon: "🍳",

  selectable: false

},

"berry-milk": {

  name: "베리우유",

  icon: "🫐",

  selectable: false

}

};



// ==================================================
// 4. 기본 가방
// ==================================================

let inventory = [

  {
    item: "carrot-seed",
    count: 5
  },

  {
    item: "potato-seed",
    count: 3
  },

  {
    item: "wheat-seed",
    count: 8
  }

];


// ==================================================
// 5. 보관함
// ==================================================

let storage = [];


// ==================================================
// 6. 작물 데이터
// ==================================================

const cropData = {

  "carrot-seed": {

    name: "당근",

    harvestItem: "carrot",

    growingIcon: "🌱",
    grownIcon: "🌿",
    readyIcon: "🥕",

    growTime1: 2000,
    growTime2: 4000

  },

  "potato-seed": {

    name: "감자",

    harvestItem: "potato",

    growingIcon: "🌱",
    grownIcon: "🌿",
    readyIcon: "🥔",

    growTime1: 2000,
    growTime2: 4000

  },

  "wheat-seed": {

    name: "밀",

    harvestItem: "wheat",

    growingIcon: "🌱",
    grownIcon: "🌿",
    readyIcon: "🌾",

    growTime1: 2000,
    growTime2: 4000

  },

  "cotton-seed": {

  name: "목화",

  harvestItem: "cotton",

  growingIcon: "🌱",
  grownIcon: "🌿",
  readyIcon: "☁️",

  growTime1: 3000,
  growTime2: 6000

},

  // 🌾 농부 전용 작물
  "strawberry-seed": {

    name: "딸기",

    harvestItem: "strawberry",

    growingIcon: "🌱",
    grownIcon: "🌿",
    readyIcon: "🍓",

    growTime1: 3000,
    growTime2: 6000

  }

};


// ==================================================
// 7. 밭 데이터
// ==================================================

let farmPlots = Array.from(
  {
    length: plotCards.length
  },
  () => ({
    state: "empty",
    seedId: null,
    plantedAt: null
  })
);


// ==================================================
// 8. 낚시 상태
// ==================================================

let fishingState = "idle";

let biteTimer = null;
let escapeTimer = null;


// ==================================================
// 9. 우클릭 메뉴 상태
// ==================================================

let contextSource = null;
let contextItemId = null;


// ==================================================
// 10. 저장
// ==================================================

function saveGame() {

  const saveData = {

    gold: gold,

    level: level,
    xp: xp,
    job: job,
    jobUnlocked: jobUnlocked,

    // 게임 날짜 / 시간
    gameDay: gameDay,
    gameMinutes: gameMinutes,

    inventory: inventory,

    inventory: inventory,

    storage: storage,

    farmPlots: farmPlots,

    pickaxeLevel: pickaxeLevel,

    villageRequests: villageRequests,

    furnitureInventory: furnitureInventory,

    placedFurniture: placedFurniture,

// 축산 농장을 샀는지도 저장
animalFarmUnlocked: animalFarmUnlockedState,

// 닭을 입양했는지 저장
chickenOwned: chickenOwned,

// 닭이 언제 달걀 생산을 시작했는지 저장
chickenProductionStartedAt: chickenProductionStartedAt,

// 소를 입양했는지 저장
cowOwned: cowOwned,

// 소가 언제 우유 생산을 시작했는지 저장
cowProductionStartedAt: cowProductionStartedAt

  };


  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify(saveData)
  );

}


// ==================================================
// 11. 불러오기
// ==================================================

function loadGame() {

  const savedData =
    localStorage.getItem(SAVE_KEY);


  if (!savedData) {
    return;
  }


  try {

    const data =
      JSON.parse(savedData);


    if (typeof data.gold === "number") {

      gold = data.gold;

    }

    if (typeof data.level === "number") {
      level = data.level;
    }

    // 게임 날짜 불러오기
    if (
      typeof data.gameDay === "number"
    ) {
      gameDay = data.gameDay;
    }

    // 게임 시간 불러오기
    if (
      typeof data.gameMinutes === "number"
    ) {
      gameMinutes = data.gameMinutes;
    }


    if (typeof data.xp === "number") {
      xp = data.xp;
    }

    if (
      data.job === null ||
      typeof data.job === "string"
    ) {
      job = data.job;
    }

if (
  Array.isArray(
    data.villageRequests
  )
) {

  villageRequests =
    data.villageRequests;

}

if (
  typeof data.pickaxeLevel === "number"
) {

  pickaxeLevel =
    data.pickaxeLevel;

}

// ========================================
// 가구 인벤토리 불러오기
// ========================================

if (
  data.furnitureInventory &&
  typeof data.furnitureInventory === "object"
) {
  furnitureInventory =
    data.furnitureInventory;
}

// ========================================
// 배치된 가구 불러오기
// ========================================

if (Array.isArray(data.placedFurniture)) {
  placedFurniture =
    data.placedFurniture;
}

if (
  typeof data.jobUnlocked === "boolean"
) {
  jobUnlocked = data.jobUnlocked;
}


if (Array.isArray(data.inventory)) {

  inventory = data.inventory;

  // 구버전 베리 ID 변환
  inventory.forEach((stack) => {

    if (stack.item === "wild-berry") {
      stack.item = "berry";
    }

  });

}


if (Array.isArray(data.storage)) {

  storage = data.storage;

  // 구버전 베리 ID 변환
  storage.forEach((stack) => {

    if (stack.item === "wild-berry") {
      stack.item = "berry";
    }

  });

}


    if (Array.isArray(data.farmPlots)) {

      farmPlots = data.farmPlots;

    }


    // 예전 저장 데이터에는 이 값이 없으므로
    // true일 때만 해금된 것으로 처리한다.

    animalFarmUnlockedState =
      data.animalFarmUnlocked === true;

// 저장된 닭 정보 불러오기
chickenOwned =
  data.chickenOwned === true;

// 생산 중이었다면 시작 시각도 불러오기
chickenProductionStartedAt =
  typeof data.chickenProductionStartedAt === "number"
    ? data.chickenProductionStartedAt
    : null;

// 저장된 소 정보 불러오기
cowOwned =
  data.cowOwned === true;

// 생산 중이었다면 시작 시각도 불러오기
cowProductionStartedAt =
  typeof data.cowProductionStartedAt === "number"
    ? data.cowProductionStartedAt
    : null;

    while (
      farmPlots.length <
      plotCards.length
    ) {

      farmPlots.push({

        state: "empty",
        seedId: null,
        plantedAt: null

      });

    }


    if (
      farmPlots.length >
      plotCards.length
    ) {

      farmPlots =
        farmPlots.slice(
          0,
          plotCards.length
        );

    }

  }

  catch (error) {

    console.error(
      "저장 데이터 불러오기 실패:",
      error
    );

  }

}


// ==================================================
// 12. 메시지
// ==================================================

function showMessage(text) {

  const oldMessage =
    document.querySelector(
      ".game-message"
    );


  if (oldMessage) {

    oldMessage.remove();

  }


  const message =
    document.createElement("div");


  message.className =
    "game-message";


  message.textContent =
    text;


  document.body.appendChild(
    message
  );


  setTimeout(
    () => {

      message.remove();

    },
    1600
  );

}



// ==================================================
// 레벨 / 경험치
// ==================================================

function getRequiredXP() {
  return level * 100;
}


function updateLevelDisplay() {

  statusLevel.textContent =
    `Lv. ${level}`;

  statusXP.textContent =
    `⭐ ${xp} / ${getRequiredXP()} XP`;

}

function updateJobDisplay() {

  const jobNames = {

    farmer: "🌾 농부",
    fisher: "🎣 낚시꾼",
    rancher: "🐄 목장주"

  };


  // 현재 직업 표시
  if (job === null) {

    statusJob.textContent =
      "직업 없음";

  } else {

    statusJob.textContent =
      jobNames[job] || "직업 없음";

  }


  // ============================================
  // 농부 전용 콘텐츠
  // ============================================

  if (strawberrySeedShopCard) {

    if (job === "farmer") {

      strawberrySeedShopCard.classList.add(
        "is-unlocked"
      );

    } else {

      strawberrySeedShopCard.classList.remove(
        "is-unlocked"
      );

    }

  }


  // ============================================
  // 목장주 전용 콘텐츠
  // ============================================

  if (rancherProcessingArea) {

    if (job === "rancher") {

      rancherProcessingArea.style.display =
        "block";

    } else {

      rancherProcessingArea.style.display =
        "none";

    }

  }

}


  // ============================================
  // 농부 전용 콘텐츠
  // ============================================

  if (strawberrySeedShopCard) {

    if (job === "farmer") {

      strawberrySeedShopCard.classList.add(
        "is-unlocked"
      );

    } else {

      strawberrySeedShopCard.classList.remove(
        "is-unlocked"
      );

    }

  }


// ==================================================
// 13. 골드 표시
// ==================================================

function updateGold() {

  headerGold.textContent =
    `💰 ${gold}G`;


  statusGold.textContent =
    `💰 ${gold}G`;


  // 축산 농장 잠금 화면의 현재 보유금도
  // 동시에 갱신한다.

  animalFarmGold.textContent =
    `💰 ${gold}G`;

}

// ========================================
// 게임 시계 표시
// ========================================

function updateGameClock() {

  if (!gameClock) {
    return;
  }

  const hours =
    Math.floor(gameMinutes / 60);

  const minutes =
    gameMinutes % 60;

  const hourText =
    String(hours).padStart(2, "0");

  const minuteText =
    String(minutes).padStart(2, "0");

  let icon = "☀️";

  if (hours >= 5 && hours < 8) {
    icon = "🌅";
  }

  else if (hours >= 8 && hours < 18) {
    icon = "☀️";
  }

  else if (hours >= 18 && hours < 21) {
    icon = "🌇";
  }

  else {
    icon = "🌙";
  }

  gameClock.textContent =
    `${icon} ${gameDay}일차 · ${hourText}:${minuteText}`;

}

// ========================================
// 시간대별 화면 분위기
// ========================================

function updateTimeTheme() {

  const hours =
    Math.floor(gameMinutes / 60);

  document.body.classList.remove(
    "time-morning",
    "time-day",
    "time-evening",
    "time-night"
  );

  if (hours >= 5 && hours < 8) {

    document.body.classList.add(
      "time-morning"
    );

  }

  else if (hours >= 8 && hours < 18) {

    document.body.classList.add(
      "time-day"
    );

  }

  else if (hours >= 18 && hours < 21) {

    document.body.classList.add(
      "time-evening"
    );

  }

  else {

    document.body.classList.add(
      "time-night"
    );

  }

}

// ========================================
// 게임 시간 진행
// ========================================

function advanceGameTime() {

  if (isDayChanging) {
    return;
  }

  gameMinutes +=
    GAME_MINUTES_PER_TICK;

  // ========================================
  // 자정 - 날짜 변경
  // ========================================

  if (gameMinutes >= 24 * 60) {

    isDayChanging = true;

    const previousDay =
      gameDay;

    gameMinutes = 0;

    // 날짜 변경 화면 시작
    if (
      dayChangeOverlay &&
      dayChangeContent
    ) {

      dayChangeContent.innerHTML = `
        <div class="day-change-icon">
          🌙
        </div>

        <div class="day-change-title">
          ${previousDay}일차가 저물었습니다
        </div>

        <div class="day-change-subtitle">
          오늘 하루도 수고했어요.
        </div>
      `;

      dayChangeOverlay.classList.add(
        "active"
      );
    }

    // ========================================
    // 다음 날짜로 변경
    // ========================================

    setTimeout(
      () => {

        gameDay += 1;

        updateGameClock();
        updateTimeTheme();
        saveGame();

        if (dayChangeContent) {

          dayChangeContent.innerHTML = `
            <div class="day-change-icon">
              🌅
            </div>

            <div class="day-change-title">
              ${gameDay}일차
            </div>

            <div class="day-change-subtitle">
              새로운 하루가 시작됩니다.
            </div>
          `;
        }

      },
      1100
    );

    // ========================================
    // 날짜 변경 화면 종료
    // ========================================

    setTimeout(
      () => {

        dayChangeOverlay?.classList.remove(
          "active"
        );

      },
      2200
    );

    setTimeout(
      () => {

        isDayChanging = false;

        showMessage(
          `🌅 ${gameDay}일차가 시작되었어요!`
        );

      },
      2800
    );

    return;
  }

  updateGameClock();
  updateTimeTheme();
}

// ========================================
// 게임 시간 자동 진행
// ========================================

setInterval(
  advanceGameTime,
  GAME_TICK_TIME
);

// ========================================
// 잠자기
// ========================================

function sleepUntilMorning() {

  // 중복 클릭 방지
  if (sleepButton) {
    sleepButton.disabled = true;
  }

  // 화면 어둡게
  sleepOverlay?.classList.add("active");


  // 화면이 어두워진 뒤 다음 날로 이동
  setTimeout(
    () => {

      gameDay += 1;

      // 오전 6시
      gameMinutes = 6 * 60;

      updateGameClock();
      updateTimeTheme();

      saveGame();

    },
    1000
  );


  // 잠시 후 다시 화면 밝히기
  setTimeout(
    () => {

      sleepOverlay?.classList.remove("active");

      showMessage(
        `🌅 좋은 아침이에요! ${gameDay}일차가 시작되었어요.`
      );

      if (sleepButton) {
        sleepButton.disabled = false;
      }

    },
    2000
  );

}

sleepButton?.addEventListener(
  "click",
  () => {

    // ========================================
    // 침대 배치 여부 확인
    // ========================================

    const hasBed =
      hasPlacedFurniture(
        "simple-bed"
      );

    if (!hasBed) {
      showMessage(
        "🛏️ 집에 침대를 배치해야 잠을 잘 수 있어요!"
      );
      return;
    }


    // ========================================
    // 잠잘 수 있는 시간인지 확인
    // ========================================

    const hours =
      Math.floor(gameMinutes / 60);

    const canSleep =
      hours >= 18 ||
      hours < 5;

    if (!canSleep) {
      showMessage(
        "☀️ 아직 잘 시간이 아니에요! 저녁이 되면 다시 와주세요."
      );
      return;
    }


    // ========================================
    // 잠자기
    // ========================================

    sleepUntilMorning();

  }
);

// ==================================================
// 14. 축산 농장 화면 갱신
// ==================================================

function updateAnimalFarm() {

  if (animalFarmUnlockedState) {

    // 메인 버튼

    animalFarmButton.textContent =
      "🐄 축산 농장";


    animalFarmButton.classList.remove(
      "locked"
    );


    animalFarmButton.classList.add(
      "unlocked"
    );


    // 잠금 화면 숨기기

    animalFarmLocked.style.display =
      "none";


    // 해금 화면 표시

    animalFarmUnlocked.classList.add(
      "show"
    );

  }

  else {

    // 메인 버튼

    animalFarmButton.textContent =
      "🔒 축산 농장";


    animalFarmButton.classList.add(
      "locked"
    );


    animalFarmButton.classList.remove(
      "unlocked"
    );


    // 잠금 화면 표시

    animalFarmLocked.style.display =
      "flex";


    // 해금 화면 숨기기

    animalFarmUnlocked.classList.remove(
      "show"
    );

  }


  animalFarmGold.textContent =
    `💰 ${gold}G`;
  updateChicken();
}


// ==================================================
// 15. 축산 농장 열기
// ==================================================

animalFarmButton.addEventListener(
  "click",
  () => {

    animalFarmSection.classList.add(
      "open"
    );


    updateAnimalFarm();


    animalFarmSection.scrollIntoView({

      behavior: "smooth",

      block: "start"

    });

  }
);

function updateChicken() {
  // 닭 관련 HTML이 없으면 실행하지 않음
  if (
    !animalFarmWheatCount ||
    !chickenEmptyState ||
    !chickenOwnedState ||
    !chickenStatus ||
    !chickenActionButton
  ) {
    return;
  }

  // 현재 가방에 있는 밀 개수 표시
  const wheatCount = getItemCount("wheat");
  animalFarmWheatCount.textContent = `${wheatCount}개`;

  // 아직 닭을 입양하지 않은 상태
  if (!chickenOwned) {
    chickenEmptyState.style.display = "flex";
    chickenOwnedState.style.display = "none";
    return;
  }

  // 닭을 입양한 상태
  chickenEmptyState.style.display = "none";
  chickenOwnedState.style.display = "flex";

  // 아직 먹이를 주지 않은 상태
  if (chickenProductionStartedAt === null) {
    chickenStatus.textContent = "배가 고픈 것 같아요.";
    chickenActionButton.textContent = "🌾 밀 1개 먹이주기";
    chickenActionButton.disabled = false;
    return;
  }

  const elapsed =
    Date.now() - chickenProductionStartedAt;

  // 아직 달걀 생산 중
  if (elapsed < CHICKEN_PRODUCTION_TIME) {
    const remaining =
      Math.ceil(
        (CHICKEN_PRODUCTION_TIME - elapsed) / 1000
      );

    chickenStatus.textContent =
      `🥚 달걀을 낳는 중... ${remaining}초`;

    chickenActionButton.textContent =
      "🥚 기다리는 중...";

    chickenActionButton.disabled = true;
    return;
  }

  // 달걀 생산 완료
  chickenStatus.textContent =
    "🥚 달걀을 낳았어요!";

  chickenActionButton.textContent =
    "🥚 달걀 수확하기";

  chickenActionButton.disabled = false;
}

function updateCow() {
  // 소 관련 HTML이 없으면 실행하지 않음
  if (
    !cowEmptyState ||
    !cowOwnedState ||
    !cowStatus ||
    !cowActionButton
  ) {
    return;
  }

  // 아직 소를 입양하지 않은 상태
  if (!cowOwned) {
    cowEmptyState.style.display = "flex";
    cowOwnedState.style.display = "none";
    return;
  }

  // 소를 입양한 상태
  cowEmptyState.style.display = "none";
  cowOwnedState.style.display = "flex";

  // 아직 먹이를 주지 않은 상태
  if (cowProductionStartedAt === null) {
    cowStatus.textContent = "배가 고픈 것 같아요.";
    cowActionButton.textContent = "🌾 밀 2개 먹이주기";
    cowActionButton.disabled = false;
    return;
  }

  const elapsed =
    Date.now() - cowProductionStartedAt;

  // 아직 우유 생산 중
  if (elapsed < COW_PRODUCTION_TIME) {
    const remaining =
      Math.ceil(
        (COW_PRODUCTION_TIME - elapsed) / 1000
      );

    cowStatus.textContent =
      `🥛 우유 생산 중... ${remaining}초`;

    cowActionButton.textContent =
      "🥛 기다리는 중...";

    cowActionButton.disabled = true;
    return;
  }

  // 우유 생산 완료
  cowStatus.textContent =
    "🥛 우유를 얻을 수 있어요!";

  cowActionButton.textContent =
    "🥛 우유 짜기";

  cowActionButton.disabled = false;
}


// ==================================================
// 16. 축산 농장 닫기
// ==================================================

animalFarmClose.addEventListener(
  "click",
  () => {

    animalFarmSection.classList.remove(
      "open"
    );

  }
);


// ==================================================
// 17. 축산 농장 구입
// ==================================================

unlockAnimalFarmButton.addEventListener(
  "click",
  () => {

    // 이미 샀다면 아무것도 하지 않는다.

    if (animalFarmUnlockedState) {

      return;

    }


    // 돈 부족

    if (
      gold <
      ANIMAL_FARM_PRICE
    ) {

      const neededGold =
        ANIMAL_FARM_PRICE -
        gold;


      showMessage(
        `🔒 ${neededGold}G가 더 필요해요!`
      );


      return;

    }


    // 2,000G 차감

    gold -=
      ANIMAL_FARM_PRICE;


    // 영구 해금

    animalFarmUnlockedState =
      true;


    updateGold();

    updateAnimalFarm();

    saveGame();


    showMessage(
      "🎉 축산 농장을 구입했어요!"
    );

  }
);

// =========================
// 닭 입양
// =========================

if (adoptChickenButton) {
  adoptChickenButton.addEventListener("click", () => {
    // 축산 농장을 아직 해금하지 않았다면
    if (!animalFarmUnlockedState) {
      showMessage("🔒 먼저 축산 농장을 구입해야 해요!");
      return;
    }

    // 이미 닭을 키우고 있다면
    if (chickenOwned) {
      showMessage("🐔 이미 닭을 키우고 있어요!");
      return;
    }

    // 돈이 부족하다면
    if (gold < CHICKEN_PRICE) {
      const neededGold = CHICKEN_PRICE - gold;

      showMessage(
        `💰 닭을 입양하려면 ${neededGold}G가 더 필요해요!`
      );

      return;
    }

    // 300G 지불
    gold -= CHICKEN_PRICE;

    // 닭 소유 상태로 변경
    chickenOwned = true;

    // 아직 먹이를 먹은 상태는 아님
    chickenProductionStartedAt = null;

    // 화면 갱신
    updateGold();
    updateChicken();

    // 저장
    saveGame();

    showMessage("🐔 새로운 닭이 축산 농장에 왔어요!");
  });
}

if (adoptCowButton) {
  adoptCowButton.addEventListener("click", () => {
    // 축산 농장을 아직 해금하지 않았다면
    if (!animalFarmUnlockedState) {
      showMessage("🔒 먼저 축산 농장을 구입해야 해요!");
      return;
    }

    // 이미 소를 키우고 있다면
    if (cowOwned) {
      showMessage("🐄 이미 소를 키우고 있어요!");
      return;
    }

    // 돈이 부족하다면
    if (gold < COW_PRICE) {
      const neededGold = COW_PRICE - gold;

      showMessage(
        `💰 소를 입양하려면 ${neededGold}G가 더 필요해요!`
      );

      return;
    }

    // 800G 지불
    gold -= COW_PRICE;

    // 소 소유 상태로 변경
    cowOwned = true;

    // 아직 먹이를 먹은 상태는 아님
    cowProductionStartedAt = null;

    // 화면 갱신
    updateGold();
    updateCow();

    // 저장
    saveGame();

    showMessage("🐄 새로운 소가 축산 농장에 왔어요!");
  });
}

// =========================
// 닭 먹이주기 / 달걀 수확
// =========================

if (chickenActionButton) {
  chickenActionButton.addEventListener("click", () => {
    // 닭이 없다면 아무것도 하지 않음
    if (!chickenOwned) {
      showMessage("🐔 먼저 닭을 입양해야 해요!");
      return;
    }

    // 아직 달걀 생산을 시작하지 않은 상태
    if (chickenProductionStartedAt === null) {
      // 가방에 밀 있는지 확인
      const wheatCount = getItemCount("wheat");

      if (wheatCount < 1) {
        showMessage("🌾 닭에게 줄 밀이 없어요!");
        return;
      }

      // 밀 1개 소비
      removeItem("wheat", 1);

      // 생산 시작 시간 기록
      chickenProductionStartedAt = Date.now();

      // 저장
      saveGame();

      // 화면 갱신
      updateChicken();

      showMessage("🐔 닭에게 밀을 먹였어요!");

      return;
    }

    // 생산 시작 후 얼마나 지났는지 계산
    const elapsed =
      Date.now() - chickenProductionStartedAt;

    // 아직 생산 중이라면
    if (elapsed < CHICKEN_PRODUCTION_TIME) {
      showMessage("🥚 아직 달걀을 낳고 있어요!");
      return;
    }

    // 가방에 달걀이 들어갈 공간이 있는지 확인
    if (!canInventoryAccept("egg")) {
      showMessage("🎒 가방이 꽉 찼어요!");
      return;
    }

    // 달걀 1개 지급
    addItem("egg", 1);

    // 달걀 수확 경험치
    addXP(10);

    // 다시 배고픈 상태로
    chickenProductionStartedAt = null;

    // 저장
    saveGame();

    // 화면 갱신
    updateChicken();

    showMessage("🥚 달걀 1개를 수확했어요! +10 XP");
  });
}

if (cowActionButton) {
  cowActionButton.addEventListener("click", () => {
    // 소가 없다면 아무것도 하지 않음
    if (!cowOwned) {
      showMessage("🐄 먼저 소를 입양해야 해요!");
      return;
    }

    // 아직 우유 생산을 시작하지 않은 상태
    if (cowProductionStartedAt === null) {
      // 가방에 밀 있는지 확인
      const wheatCount = getItemCount("wheat");

      if (wheatCount < 2) {
        showMessage("🌾 소에게 줄 밀이 2개 필요해요!");
        return;
      }

      // 밀 2개 소비
      removeItem("wheat", 2);

      // 생산 시작 시간 기록
      cowProductionStartedAt = Date.now();

      // 저장
      saveGame();

      // 화면 갱신
      updateCow();

      showMessage("🐄 소에게 밀 2개를 먹였어요!");

      return;
    }

    // 생산 시작 후 얼마나 지났는지 계산
    const elapsed =
      Date.now() - cowProductionStartedAt;

    // 아직 생산 중이라면
    if (elapsed < COW_PRODUCTION_TIME) {
      showMessage("🥛 아직 우유를 생산하고 있어요!");
      return;
    }

    // 가방에 우유가 들어갈 공간이 있는지 확인
    if (!canInventoryAccept("milk")) {
      showMessage("🎒 가방이 꽉 찼어요!");
      return;
    }

    // 우유 1개 지급
    addItem("milk", 1);

    // 우유 수확 경험치
    addXP(10);

    // 다시 배고픈 상태로
    cowProductionStartedAt = null;

    // 저장
    saveGame();

    // 화면 갱신
    updateCow();

    showMessage("🥛 우유 1개를 얻었어요! +10 XP");
  });
}

 // ============================================
// 목장주 전용 : 버터 만들기
// ============================================

if (makeButterButton) {
  makeButterButton.addEventListener("click", () => {

    // 목장주가 아니면 사용할 수 없음
    if (job !== "rancher") {
      showMessage("🐄 목장주만 축산물을 가공할 수 있어요!");
      return;
    }

    // 우유가 있는지 확인
    const milkCount = getItemCount("milk");

    if (milkCount < 1) {
      showMessage("🥛 버터를 만들려면 우유 1개가 필요해요!");
      return;
    }

    // 버터가 들어갈 공간 확인
    if (!canInventoryAccept("butter")) {
      showMessage("🎒 가방이 꽉 찼어요!");
      return;
    }

    // 우유 1개 소비
    removeItem("milk", 1);

    // 버터 1개 지급
    addItem("butter", 1);

    // 경험치 지급
    addXP(10);

    // 저장
    saveGame();

    // 인벤토리 갱신
    renderAllInventories();

    showMessage(
      "🧈 우유를 가공해서 버터 1개를 만들었어요! +10 XP"
    );

  });
}


// ========================================
// 가구 데이터
// ========================================

const furnitureData = {

  "wood-chair": {
    name: "나무 의자",
    icon: "🪑",
    size: "1 × 1",
    width: 1,
    height: 1,
    description:
      "작고 소박한 나무 의자예요. 집 안의 빈 공간에 배치할 수 있어요.",
    materialText:
      "🪵 나뭇가지 ×4"
  },

  "wood-table": {
    name: "나무 탁자",
    icon: "🪵",
    size: "2 × 1",
    width: 2,
    height: 1,
    description:
      "튼튼한 나무 탁자예요. 가로로 두 칸을 차지하며 의자와 함께 배치하면 특별한 효과를 낼 수 있어요.",
    materialText:
      "🪵 나뭇가지 ×8"
  },

  "stone-planter": {
    name: "돌 화분",
    icon: "🪴",
    size: "1 × 1",
    width: 1,
    height: 1,
    description:
      "돌과 허브로 만든 작은 화분이에요. 배치하면 농사에 작은 도움을 줘요.",
    materialText:
      "🪨 돌 ×5 · 🌿 허브 ×2"
  },

  "copper-lamp": {
    name: "구리 램프",
    icon: "🕯️",
    size: "1 × 1",
    width: 1,
    height: 1,
    description:
      "은은한 빛을 내는 구리 램프예요. 주변 가구의 효과를 강화해요.",
    materialText:
      "🟤 구리 광석 ×5 · 🪨 돌 ×2"
  },

  "simple-bed": {
  name: "포근한 침대",
  icon: "🛏️",
  size: "2 × 1",
  width: 2,
  height: 1,
  description:
    "하루를 마치고 편안하게 쉴 수 있는 침대예요. 집에 배치해야 잠을 잘 수 있어요.",
  materialText:
  "🪵 나뭇가지 ×10 · ☁️ 목화 ×5"
}

};

// ========================================
// 공방 가구 선택
// ========================================

const furnitureOptions =
  document.querySelectorAll(
    ".furniture-option"
  );

const previewIcon =
  document.querySelector(
    ".furniture-preview-icon"
  );

const previewName =
  document.querySelector(
    ".furniture-preview-name"
  );

const previewSize =
  document.querySelector(
    ".furniture-preview-size"
  );

const workbenchName =
  document.querySelector(
    ".workbench-info h3"
  );

const workbenchDescription =
  document.querySelector(
    ".workbench-description"
  );

const materialRow =
  document.querySelector(
    ".material-row"
  );

const mainCraftButton =
  document.querySelector(
    ".main-craft-button"
  );


furnitureOptions.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const furnitureId =
          button.dataset.furniture;

        const furniture =
          furnitureData[furnitureId];

        if (!furniture) {
          return;
        }


        // 선택 표시 변경
        furnitureOptions.forEach(
          (option) => {
            option.classList.remove(
              "selected"
            );
          }
        );

        button.classList.add(
          "selected"
        );


        // 큰 미리보기 변경
        previewIcon.textContent =
          furniture.icon;

        previewName.textContent =
          furniture.name;

        previewSize.textContent =
          `📐 ${furniture.size}`;


        // 설명 변경
        workbenchName.textContent =
          furniture.name;

        workbenchDescription.textContent =
          furniture.description;


        // 필요한 재료 변경
        materialRow.innerHTML = `
          <span>
            ${furniture.materialText}
          </span>
        `;


        // 제작 버튼이 어떤 가구를
        // 제작할지도 변경
        mainCraftButton.dataset.recipe =
          furnitureId;

      }
    );

  }
);


// ========================================
// 집 꾸미기 화면
// ========================================

const decorateHouseButton =
  document.querySelector(
    "#decorateHouseButton"
  );

const houseDecorArea =
  document.querySelector(
    "#houseDecorArea"
  );

const closeDecorButton =
  document.querySelector(
    "#closeDecorButton"
  );

const rotateFurnitureButton =
  document.querySelector(
    "#rotateFurnitureButton"
  );

  // ========================================
// 가구 회전 시스템
// ========================================

function getFurnitureSize(
  furnitureId
) {

  const data =
    furnitureData[furnitureId];

  if (!data) {

    return {
      width: 1,
      height: 1
    };

  }


  let width =
    data.width || 1;

  let height =
    data.height || 1;


  // 90도 회전
  if (furnitureRotation === 90) {

    const temp =
      width;

    width =
      height;

    height =
      temp;

  }


  return {
    width,
    height
  };

}


// ========================================
// 회전 버튼
// ========================================

rotateFurnitureButton?.addEventListener(
  "click",
  () => {

    // 가구를 선택하지 않은 경우
    if (!selectedFurnitureId) {

      showMessage(
        "🪑 먼저 회전할 가구를 선택해주세요!"
      );

      return;

    }


    const data =
      furnitureData[
        selectedFurnitureId
      ];


    if (!data) {
      return;
    }


    // 1×1 가구는 회전할 필요 없음
    if (
      (data.width || 1) ===
      (data.height || 1)
    ) {

      showMessage(
        "🔄 이 가구는 회전해도 모양이 같아요!"
      );

      return;

    }


    // 0도 ↔ 90도
    furnitureRotation =
      furnitureRotation === 0
        ? 90
        : 0;


    const size =
      getFurnitureSize(
        selectedFurnitureId
      );


    // 가구 목록의 크기 표시 갱신
    renderDecorFurnitureList();


    showMessage(
      `🔄 가구를 회전했어요! ${size.width}×${size.height}`
    );

  }
);

const houseGrid =
  document.querySelector(
    "#houseGrid"
  );

const decorFurnitureList =
  document.querySelector(
    "#decorFurnitureList"
  );

// 현재 선택한 가구
let selectedFurnitureId = null;

let furnitureRotation = 0;

// 집에 배치된 가구
let placedFurniture = [];


// ========================================
// 배치된 가구의 실제 크기 계산
// ========================================

function getPlacedFurnitureSize(placed) {

  const data =
    furnitureData[placed.furnitureId];

  if (!data) {
    return {
      width: 1,
      height: 1
    };
  }


  let width =
    data.width || 1;

  let height =
    data.height || 1;


  // 배치 당시 90도 회전한 가구
  if (placed.rotation === 90) {

    const temp = width;

    width = height;
    height = temp;

  }


  return {
    width,
    height
  };
}

// ========================================
// 가구 효과 시스템
// ========================================

function hasAdjacentFurniture(
  furnitureIdA,
  furnitureIdB
) {

  const furnitureA =
    placedFurniture.filter(
      placed =>
        placed.furnitureId === furnitureIdA
    );


  const furnitureB =
    placedFurniture.filter(
      placed =>
        placed.furnitureId === furnitureIdB
    );


  // 특정 가구가 차지하는 칸들을 구하는 함수
  function getOccupiedCells(placed) {

    const size =
      getPlacedFurnitureSize(placed);

    const startRow =
      Math.floor(placed.cell / 6);

    const startCol =
      placed.cell % 6;

    const cells = [];


    for (
      let rowOffset = 0;
      rowOffset < size.height;
      rowOffset++
    ) {

      for (
        let colOffset = 0;
        colOffset < size.width;
        colOffset++
      ) {

        cells.push({
          row: startRow + rowOffset,
          col: startCol + colOffset
        });

      }

    }


    return cells;
  }


  // A와 B의 모든 조합 검사
  for (const a of furnitureA) {

    const aCells =
      getOccupiedCells(a);


    for (const b of furnitureB) {

      const bCells =
        getOccupiedCells(b);


      for (const aCell of aCells) {

        for (const bCell of bCells) {

          const rowDistance =
            Math.abs(
              aCell.row - bCell.row
            );

          const colDistance =
            Math.abs(
              aCell.col - bCell.col
            );


          // 상하좌우로 정확히 붙어 있는 경우
          if (
            rowDistance + colDistance === 1
          ) {

            return true;

          }

        }

      }

    }

  }


  return false;
}


// ========================================
// 특정 가구가 집에 배치되어 있는지 확인
// ========================================

function hasPlacedFurniture(
  furnitureId
) {

  return placedFurniture.some(
    placed =>
      placed.furnitureId === furnitureId
  );

}

function hasLampNextToFurniture(
  furnitureId
) {

  return hasAdjacentFurniture(
    "copper-lamp",
    furnitureId
  );

}

// ========================================
// 현재 활성화된 가구 효과 확인
// ========================================

function updateFurnitureEffects() {

  const effectList =
    document.querySelector(
      "#houseEffectList"
    );


  // ========================================
  // 효과 판정
  // ========================================

  const chairTableBonus =
    hasAdjacentFurniture(
      "wood-chair",
      "wood-table"
    );

  const planterBonus =
    hasPlacedFurniture(
      "stone-planter"
    );

  const planterLampBonus =
  hasLampNextToFurniture(
    "stone-planter"
  );


  // UI가 없으면 종료
  if (!effectList) {
    return;
  }


  effectList.innerHTML = "";

// ========================================
// 초록빛 실내
// ========================================

if (planterBonus) {

  const card =
    document.createElement("div");

  card.className =
    "house-effect-card";

  card.innerHTML = `
    <span class="house-effect-icon">
      ${planterLampBonus ? "✨" : "🌱"}
    </span>

    <div class="house-effect-info">

      <span class="house-effect-name">
        초록빛 실내
        ${planterLampBonus
          ? " · 🕯️ 강화됨"
          : ""}
      </span>

      <span class="house-effect-description">
        ${
          planterLampBonus
            ? "구리 램프의 빛을 받아 수확 시 30% 확률로 작물을 1개 더 얻어요."
            : "수확할 때 20% 확률로 작물을 1개 더 얻어요."
        }
      </span>

    </div>
  `;

  effectList.appendChild(card);
}

  // ========================================
  // 아늑한 식사 공간
  // ========================================

  if (chairTableBonus) {

    const card =
      document.createElement("div");

    card.className =
      "house-effect-card";

    card.innerHTML = `
      <span class="house-effect-icon">
        🍀
      </span>

      <div class="house-effect-info">

        <span class="house-effect-name">
          아늑한 식사 공간
        </span>

        <span class="house-effect-description">
          🪑 나무 의자와 🪵 나무 탁자가 붙어 있어요.
        </span>

      </div>
    `;

    effectList.appendChild(card);

  }



  // ========================================
  // 활성 효과 없음
  // ========================================

  if (
    !chairTableBonus &&
    !planterBonus
  ) {

    effectList.innerHTML = `
      <div class="house-effect-empty">
        아직 활성화된 효과가 없어요.
      </div>
    `;

  }

}



// ========================================
// 6 × 6 방 만들기
// ========================================

function renderHouseGrid() {

  if (!houseGrid) {
    return;
  }

  houseGrid.innerHTML = "";

  const GRID_SIZE = 6;


  // ========================================
  // 가구의 실제 크기 계산
  // ========================================

  function getPlacedFurnitureSize(placed) {

    const data =
      furnitureData[
        placed.furnitureId
      ];

    if (!data) {
      return {
        width: 1,
        height: 1
      };
    }


    let width =
      data.width || 1;

    let height =
      data.height || 1;


    // 배치 당시 회전 상태 적용
    if (placed.rotation === 90) {

      const temp = width;

      width = height;

      height = temp;

    }


    return {
      width,
      height
    };

  }


  // ========================================
  // 특정 칸을 차지하고 있는 가구 찾기
  // ========================================

  function getFurnitureAtCell(cellIndex) {

    const row =
      Math.floor(
        cellIndex / GRID_SIZE
      );

    const col =
      cellIndex % GRID_SIZE;


    return placedFurniture.find(
      (placed) => {

        const startRow =
          Math.floor(
            placed.cell / GRID_SIZE
          );

        const startCol =
          placed.cell % GRID_SIZE;


        const size =
          getPlacedFurnitureSize(
            placed
          );


        return (
          row >= startRow &&
          row < startRow + size.height &&
          col >= startCol &&
          col < startCol + size.width
        );

      }
    );

  }


  // ========================================
  // 현재 선택한 가구 크기
  // ========================================

  function getSelectedFurnitureSize(
    furnitureId
  ) {

    const data =
      furnitureData[
        furnitureId
      ];

    if (!data) {
      return {
        width: 1,
        height: 1
      };
    }


    let width =
      data.width || 1;

    let height =
      data.height || 1;


    if (furnitureRotation === 90) {

      const temp = width;

      width = height;

      height = temp;

    }


    return {
      width,
      height
    };

  }


  // ========================================
  // 가구 배치 가능 여부
  // ========================================

  function canPlaceFurniture(
    furnitureId,
    startCell
  ) {

    const size =
      getSelectedFurnitureSize(
        furnitureId
      );


    const startRow =
      Math.floor(
        startCell / GRID_SIZE
      );

    const startCol =
      startCell % GRID_SIZE;


    // 방 바깥으로 나가는지 확인
    if (
      startCol + size.width >
        GRID_SIZE ||
      startRow + size.height >
        GRID_SIZE
    ) {

      return false;

    }


    // 가구가 차지할 모든 칸 검사
    for (
      let y = 0;
      y < size.height;
      y += 1
    ) {

      for (
        let x = 0;
        x < size.width;
        x += 1
      ) {

        const cellIndex =
          (startRow + y) *
            GRID_SIZE +
          (startCol + x);


        if (
          getFurnitureAtCell(
            cellIndex
          )
        ) {

          return false;

        }

      }

    }


    return true;

  }


  // ========================================
  // 6 × 6 방 생성
  // ========================================

  for (
    let i = 0;
    i <
      GRID_SIZE * GRID_SIZE;
    i += 1
  ) {

    const cell =
      document.createElement(
        "div"
      );

    cell.className =
      "house-grid-cell";

    cell.dataset.cell = i;


    const placed =
      getFurnitureAtCell(i);


    // ========================================
    // 이미 배치된 가구 표시
    // ========================================

    if (placed) {

      const data =
        furnitureData[
          placed.furnitureId
        ];

      const size =
        getPlacedFurnitureSize(
          placed
        );


      cell.classList.add(
        "occupied"
      );

      cell.title =
        data?.name || "가구";


      // 회전 방향을 CSS에서도 알 수 있게 함
      if (placed.rotation === 90) {

        cell.classList.add(
          "rotated-furniture"
        );

      }


      // 시작 칸
      if (placed.cell === i) {

        const furnitureVisual =
          document.createElement(
            "div"
          );

        furnitureVisual.className =
          `placed-furniture placed-${placed.furnitureId}`;


        // 가구 자체에도 회전 클래스
        if (
          placed.rotation === 90
        ) {

          furnitureVisual.classList.add(
            "rotated"
          );

        }


        furnitureVisual.innerHTML = `
          <span class="placed-furniture-icon">
            ${data?.icon || "🪑"}
          </span>
        `;


        cell.appendChild(
          furnitureVisual
        );

      } else {

        cell.textContent = "";

        cell.classList.add(
          "furniture-extension"
        );

        cell.classList.add(
  `extension-${placed.furnitureId}`
);


        // 세로로 이어지는 가구인지 표시
        if (
          size.width === 1 &&
          size.height > 1
        ) {

          cell.classList.add(
            "vertical-extension"
          );

        } else {

          cell.classList.add(
            "horizontal-extension"
          );

        }

      }

    }


    // ========================================
    // 칸 클릭
    // ========================================

    cell.addEventListener(
      "click",
      () => {

        const currentPlaced =
          getFurnitureAtCell(i);


        // ========================================
        // 이미 가구 있음 → 회수
        // ========================================

        if (currentPlaced) {

          const furnitureId =
            currentPlaced.furnitureId;

          const data =
            furnitureData[
              furnitureId
            ];


          placedFurniture =
            placedFurniture.filter(
              (furniture) =>
                furniture !==
                currentPlaced
            );


          furnitureInventory[
            furnitureId
          ] =
            (
              furnitureInventory[
                furnitureId
              ] || 0
            ) + 1;


          renderHouseGrid();

          renderDecorFurnitureList();

          renderFurnitureInventory();

          updateFurnitureEffects();

          updateSleepButton();

          saveGame();


          showMessage(
            `${data?.icon || "🪑"} ${data?.name || "가구"}를 회수했어요!`
          );

          return;

        }


        // ========================================
        // 선택한 가구 없음
        // ========================================

        if (!selectedFurnitureId) {

          showMessage(
            "🪑 먼저 배치할 가구를 선택해주세요!"
          );

          return;

        }


        // ========================================
        // 보유 수량 확인
        // ========================================

        const count =
          furnitureInventory[
            selectedFurnitureId
          ] || 0;


        if (count <= 0) {

          showMessage(
            "📦 가지고 있는 가구가 없어요!"
          );

          selectedFurnitureId =
            null;

          renderDecorFurnitureList();

          return;

        }


        // ========================================
        // 공간 확인
        // ========================================

        if (
          !canPlaceFurniture(
            selectedFurnitureId,
            i
          )
        ) {

          showMessage(
            "🚫 이 위치에는 가구를 놓을 수 없어요!"
          );

          return;

        }


        // ========================================
        // 실제 배치
        // ========================================

        placedFurniture.push({

          furnitureId:
            selectedFurnitureId,

          cell: i,

          rotation:
            furnitureRotation

        });


        // 가구 수량 감소
        furnitureInventory[
          selectedFurnitureId
        ] -= 1;


        // 수량이 0이면 선택 해제
        if (
          furnitureInventory[
            selectedFurnitureId
          ] <= 0
        ) {

          selectedFurnitureId =
            null;

        }


        renderHouseGrid();

        renderDecorFurnitureList();

        renderFurnitureInventory();

        updateFurnitureEffects();

        updateSleepButton();

        saveGame();


        showMessage(
          "🏡 가구를 배치했어요!"
        );

      }
    );


    houseGrid.appendChild(
      cell
    );

  }

}// ========================================
// 배치용 가구 목록
// ========================================

function renderDecorFurnitureList() {

  if (!decorFurnitureList) {
    return;
  }

  decorFurnitureList.innerHTML = "";

  let hasFurniture = false;


  Object.entries(furnitureData).forEach(
    ([furnitureId, furniture]) => {

      const count =
        furnitureInventory[furnitureId] || 0;


      if (count <= 0) {
        return;
      }


      hasFurniture = true;


      const button =
        document.createElement("button");

      button.type = "button";

      button.className =
        "decor-furniture-item";

      button.dataset.furniture =
        furnitureId;


      if (
        selectedFurnitureId ===
        furnitureId
      ) {

        button.classList.add(
          "selected"
        );

      }


      // 현재 선택된 가구라면
      // 회전된 크기도 표시
      let width =
        furniture.width || 1;

      let height =
        furniture.height || 1;


      if (
        selectedFurnitureId === furnitureId &&
        furnitureRotation === 90
      ) {

        const temp = width;

        width = height;
        height = temp;

      }


      button.innerHTML = `
        <span class="decor-furniture-item-icon">
          ${furniture.icon}
        </span>

        <span class="decor-furniture-item-info">

          <span class="decor-furniture-item-name">
            ${furniture.name}
          </span>

          <span class="decor-furniture-item-count">
            ${width}×${height}
            · 보유 ×${count}
          </span>

        </span>
      `;


      button.addEventListener(
        "click",
        () => {

          // 다른 가구를 선택하면
          // 기본 방향으로 초기화
          if (
            selectedFurnitureId !==
            furnitureId
          ) {

            furnitureRotation = 0;

          }


          selectedFurnitureId =
            furnitureId;


          renderDecorFurnitureList();

        }
      );


      decorFurnitureList.appendChild(
        button
      );

    }
  );


  if (!hasFurniture) {

    decorFurnitureList.innerHTML = `
      <div class="furniture-empty-message">
        배치할 가구가 없어요.
      </div>
    `;

  }

}


// ========================================
// 꾸미기 열기
// ========================================

decorateHouseButton?.addEventListener(
  "click",
  () => {

    renderHouseGrid();
    renderDecorFurnitureList();

    houseDecorArea?.classList.add(
      "open"
    );


    setTimeout(
      () => {

        houseDecorArea?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      },
      50
    );

  }
);


// ========================================
// 꾸미기 닫기
// ========================================

closeDecorButton?.addEventListener(
  "click",
  () => {

    houseDecorArea?.classList.remove(
      "open"
    );

  }
);

// ========================================
// 가구 보관함 렌더링
// ========================================

function renderFurnitureInventory() {

  const grid =
    document.querySelector(
      "#furnitureInventoryGrid"
    );

  if (!grid) {
    return;
  }


  grid.innerHTML = "";

  let hasFurniture = false;


  Object.entries(furnitureData).forEach(
    ([furnitureId, furniture]) => {

      const count =
        furnitureInventory[furnitureId] || 0;


      if (count <= 0) {
        return;
      }


      hasFurniture = true;


      const card =
        document.createElement("div");

      card.className =
        "furniture-inventory-card";


      card.innerHTML = `
        <div class="furniture-inventory-icon">
          ${furniture.icon}
        </div>

        <div class="furniture-inventory-name">
          ${furniture.name}
        </div>

        <div class="furniture-inventory-bottom">

          <span class="furniture-inventory-size">
            ${furniture.width}×${furniture.height}
          </span>

          <strong class="furniture-inventory-count">
            ×${count}
          </strong>

        </div>
      `;


      grid.appendChild(card);

    }
  );


  // 가구가 하나도 없을 때
  if (!hasFurniture) {

    grid.innerHTML = `
      <div class="furniture-empty-message">
        아직 가지고 있는 가구가 없어요.
      </div>
    `;

  }

}

// ========================================
// 가구 제작 시스템
// ========================================

function craftFurniture(recipeId) {


  // ========================================
  // 제작 레시피
  // ========================================

  const recipes = {

    "wood-chair": {
      name: "나무 의자",
      icon: "🪑",
      materials: [
        {
          item: "branch",
          amount: 4
        }
      ]
    },

    "wood-table": {
  name: "나무 탁자",
  icon: "🪵",
  materials: [
    {
      item: "branch",
      amount: 8
    }
  ]
},

    "stone-planter": {
      name: "돌 화분",
      icon: "🪴",
      materials: [
        {
          item: "stone",
          amount: 5
        },
        {
          item: "herb",
          amount: 2
        }
      ]
    },

"copper-lamp": {
  name: "구리 램프",
  icon: "🕯️",
  materials: [
    {
      item: "copper-ore",
      amount: 5
    },
    {
      item: "stone",
      amount: 2
    }
  ]
},

"simple-bed": {
  name: "포근한 침대",
  icon: "🛏️",
  materials: [
    {
      item: "branch",
      amount: 10
    },
    {
      item: "cotton",
      amount: 5
    }
  ]
}

  };


  const recipe =
    recipes[recipeId];

  if (!recipe) {
    return;
  }


  // ========================================
  // 재료 확인
  // ========================================

  for (const material of recipe.materials) {

    const owned =
      getItemCount(material.item);

    if (owned < material.amount) {

      const info =
        itemData[material.item];

      showMessage(
        `${info.icon} ${info.name}이(가) ${material.amount}개 필요해요!`
      );

      return;
    }

  }


  // ========================================
  // 재료 소비
  // ========================================

  for (const material of recipe.materials) {

    removeItem(
      material.item,
      material.amount
    );

  }


  // ========================================
  // 가구 획득
  // ========================================

  furnitureInventory[recipeId] =
    (furnitureInventory[recipeId] || 0) + 1;


  renderAllInventories();

  renderFurnitureInventory();

  saveGame();


  showMessage(
    `${recipe.icon} ${recipe.name}을(를) 제작했어요!`
  );

}


// ========================================
// 공방 제작 버튼
// ========================================

document
  .querySelectorAll(".craft-button")
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const recipeId =
          button.dataset.recipe;

        craftFurniture(recipeId);

      }
    );

  });

// ========================================
// 요리 시스템
// ========================================

function cookItem(
  ingredients,
  resultItem,
  resultAmount = 1
) {

  // 필요한 재료가 있는지 확인
  for (const ingredient of ingredients) {

    const currentAmount =
      getItemCount(ingredient.item);

    if (currentAmount < ingredient.amount) {

      const item =
        itemData[ingredient.item];

      showMessage(
        `${item.icon} ${item.name}이(가) ${ingredient.amount}개 필요해요!`
      );

      return;
    }
  }


  // 완성된 음식을 넣을 공간 확인
  if (!canInventoryAccept(resultItem)) {

    showMessage(
      "🎒 가방이 꽉 찼어요!"
    );

    return;
  }


  // 재료 소비
  for (const ingredient of ingredients) {

    removeItem(
      ingredient.item,
      ingredient.amount
    );

  }


  // 완성 음식 획득
  addItem(
    resultItem,
    resultAmount
  );


  // 경험치
  addXP(10);


  const result =
    itemData[resultItem];


  renderAllInventories();

  saveGame();


  showMessage(
    `${result.icon} ${result.name}을(를) 만들었어요! +10 XP`
  );

}

// ========================================
// 요리 레시피
// ========================================


// 🥔 버터감자

cookButterPotatoButton?.addEventListener(
  "click",
  () => {

    cookItem(
      [
        {
          item: "potato",
          amount: 1
        },
        {
          item: "butter",
          amount: 1
        }
      ],
      "butter-potato"
    );

  }
);


// 🍓 딸기우유

cookStrawberryMilkButton?.addEventListener(
  "click",
  () => {

    cookItem(
      [
        {
          item: "strawberry",
          amount: 1
        },
        {
          item: "milk",
          amount: 1
        }
      ],
      "strawberry-milk"
    );

  }
);


// 🍄 버섯볶음

cookMushroomButton?.addEventListener(
  "click",
  () => {

    cookItem(
      [
        {
          item: "mushroom",
          amount: 2
        },
        {
          item: "egg",
          amount: 1
        }
      ],
      "mushroom-stir-fry"
    );

  }
);


// 🫐 베리우유

cookBerryMilkButton?.addEventListener(
  "click",
  () => {

    cookItem(
      [
        {
          item: "berry",
          amount: 2
        },
        {
          item: "milk",
          amount: 1
        }
      ],
      "berry-milk"
    );

  }
);

// ==================================================
// 18. 컨테이너 수량
// ==================================================

function getContainerCount(
  container,
  itemId
) {

  let total = 0;


  for (const stack of container) {

    if (
      stack.item === itemId
    ) {

      total += stack.count;

    }

  }


  return total;

}


function getItemCount(itemId) {

  return getContainerCount(
    inventory,
    itemId
  );

}


// ==================================================
// 19. 들어갈 수 있는 공간 계산
// ==================================================

function getAvailableCapacity(
  container,
  slotLimit,
  itemId
) {

  let capacity = 0;


  for (const stack of container) {

    if (
      stack.item === itemId
    ) {

      capacity +=
        MAX_STACK -
        stack.count;

    }

  }


  const emptySlots =
    Math.max(
      0,
      slotLimit -
      container.length
    );


  capacity +=
    emptySlots *
    MAX_STACK;


  return capacity;

}


// ==================================================
// 20. 컨테이너에 아이템 추가
// ==================================================

function addToContainer(
  container,
  slotLimit,
  itemId,
  amount
) {

  if (!itemData[itemId]) {

    return 0;

  }


  const capacity =
    getAvailableCapacity(
      container,
      slotLimit,
      itemId
    );


  let remaining =
    Math.min(
      amount,
      capacity
    );


  const amountAccepted =
    remaining;


  // 기존 스택부터 채운다.

  for (const stack of container) {

    if (
      stack.item === itemId &&
      stack.count < MAX_STACK
    ) {

      const space =
        MAX_STACK -
        stack.count;


      const addAmount =
        Math.min(
          space,
          remaining
        );


      stack.count +=
        addAmount;


      remaining -=
        addAmount;


      if (
        remaining <= 0
      ) {

        break;

      }

    }

  }


  // 남은 아이템은 새 스택 생성

  while (
    remaining > 0 &&
    container.length < slotLimit
  ) {

    const stackAmount =
      Math.min(
        MAX_STACK,
        remaining
      );


    container.push({

      item: itemId,
      count: stackAmount

    });


    remaining -=
      stackAmount;

  }


  return amountAccepted;

}


// ==================================================
// 21. 컨테이너에서 제거
// ==================================================

function removeFromContainer(
  container,
  itemId,
  amount
) {

  if (
    getContainerCount(
      container,
      itemId
    ) < amount
  ) {

    return false;

  }


  let remaining =
    amount;


  for (
    let i =
      container.length - 1;

    i >= 0;

    i--
  ) {

    const stack =
      container[i];


    if (
      stack.item !== itemId
    ) {

      continue;

    }


    const removeAmount =
      Math.min(
        stack.count,
        remaining
      );


    stack.count -=
      removeAmount;


    remaining -=
      removeAmount;


    if (
      stack.count <= 0
    ) {

      container.splice(
        i,
        1
      );

    }


    if (
      remaining <= 0
    ) {

      break;

    }

  }


  return true;

}


// ==================================================
// 22. 가방에 추가
// ==================================================

function addItem(
  itemId,
  amount = 1
) {

  const added =
    addToContainer(
      inventory,
      INVENTORY_SLOTS,
      itemId,
      amount
    );


  if (
    added <= 0
  ) {

    return false;

  }


  renderAllInventories();

  saveGame();


  return added;

}


// ==================================================
// 23. 가방에서 제거
// ==================================================

function removeItem(
  itemId,
  amount = 1
) {

  const removed =
    removeFromContainer(
      inventory,
      itemId,
      amount
    );


  if (!removed) {

    return false;

  }


  if (
    getItemCount(itemId) <= 0
  ) {

    if (
      selectedItem === itemId
    ) {

      selectedItem = null;

    }


    if (
      focusedItem === itemId
    ) {

      focusedItem = null;

    }

  }


  renderAllInventories();

  saveGame();


  return true;

}


// ==================================================
// 24. 가방 공간 확인
// ==================================================

function canInventoryAccept(itemId) {

  return (
    getAvailableCapacity(
      inventory,
      INVENTORY_SLOTS,
      itemId
    ) > 0
  );

}


// ==================================================
// 25. 낚시 공간 확인
// ==================================================

function hasFishingSpace() {

  const fishIds = [

    "crucian",
    "minnow",
    "golden-crucian"

  ];


  return fishIds.some(
    (fishId) =>
      canInventoryAccept(
        fishId
      )
  );

}


// ==================================================
// 26. 상점 보유량
// ==================================================

function updateShopOwnedCounts() {

  shopOwnedLabels.forEach(
    (label) => {

      const itemId =
        label.dataset.ownedItem;


      const amount =
        getItemCount(
          itemId
        );


      label.textContent =
        `가방: ${amount}개`;

    }
  );

}


// ==================================================
// 27. 일반 가방 렌더링
// ==================================================

function renderInventory() {

  inventoryGrid.innerHTML = "";
  


  inventory.forEach(
    (stack) => {

      const info =
        itemData[stack.item];


      if (!info) {

        return;

      }


      const slot =
        document.createElement(
          "button"
        );


      slot.className =
        "item-slot";


      if (
        focusedItem ===
        stack.item
      ) {

        slot.classList.add(
          "selected"
        );

      }


      slot.innerHTML = `

        <span class="item-name">
          ${info.name}
        </span>

        <span class="item-icon">
          ${info.icon}
        </span>

        <span class="item-count">
          ${stack.count}
        </span>

      `;


      slot.addEventListener(
        "click",
        () => {

          handleItemLeftClick(
            stack.item
          );

        }
      );


      slot.addEventListener(
        "contextmenu",
        (event) => {

          event.preventDefault();


          if (
            !homeSection.classList.contains(
              "open"
            )
          ) {

            showMessage(
              "🏠 보관함 이동은 우리 집에서 할 수 있어요."
            );

            return;

          }


          openContextMenu(
            event,
            "inventory",
            stack.item
          );

        }
      );


      inventoryGrid.appendChild(
        slot
      );

    }
  );


  const emptyCount =
    INVENTORY_SLOTS -
    inventory.length;


  for (
    let i = 0;
    i < emptyCount;
    i++
  ) {

    const emptySlot =
      document.createElement(
        "div"
      );


    emptySlot.className =
      "item-slot empty";


    inventoryGrid.appendChild(
      emptySlot
    );

  }


  inventorySlotCount.textContent =
    `${inventory.length} / ${INVENTORY_SLOTS}`;

}


// ==================================================
// 28. 집 가방 렌더링
// ==================================================

function renderHomeInventory() {

  homeInventoryGrid.innerHTML = "";


  inventory.forEach(
    (stack) => {

      const slot =
        createStorageSlot(
          stack,
          "inventory"
        );


      homeInventoryGrid.appendChild(
        slot
      );

    }
  );


  const emptyCount =
    INVENTORY_SLOTS -
    inventory.length;


  for (
    let i = 0;
    i < emptyCount;
    i++
  ) {

    homeInventoryGrid.appendChild(
      createEmptyStorageSlot()
    );

  }


  homeInventoryCount.textContent =
    `${inventory.length} / ${INVENTORY_SLOTS}`;

}


// ==================================================
// 29. 보관함 렌더링
// ==================================================

function renderStorage() {

  storageGrid.innerHTML = "";


  storage.forEach(
    (stack) => {

      const slot =
        createStorageSlot(
          stack,
          "storage"
        );


      storageGrid.appendChild(
        slot
      );

    }
  );


  const emptyCount =
    STORAGE_SLOTS -
    storage.length;


  for (
    let i = 0;
    i < emptyCount;
    i++
  ) {

    storageGrid.appendChild(
      createEmptyStorageSlot()
    );

  }


  storageCount.textContent =
    `${storage.length} / ${STORAGE_SLOTS}`;

}


// ==================================================
// 30. 집 아이템 슬롯 생성
// ==================================================

function createStorageSlot(
  stack,
  source
) {

  const info =
    itemData[stack.item];


  const slot =
    document.createElement(
      "div"
    );


  slot.className =
    "storage-slot";


  if (
    source === "inventory" &&
    focusedItem === stack.item
  ) {

    slot.classList.add(
      "selected"
    );

  }


  slot.innerHTML = `

    <span class="storage-slot-name">
      ${info.name}
    </span>

    <span class="storage-slot-icon">
      ${info.icon}
    </span>

    <span class="storage-slot-count">
      ${stack.count}
    </span>

  `;


  slot.addEventListener(
    "click",
    () => {

      if (
        source === "inventory"
      ) {

        handleItemLeftClick(
          stack.item
        );

      }

      else {

        selectedItem = null;

        focusedItem = null;


        showMessage(
          `${info.icon} ${info.name} ×${getContainerCount(storage, stack.item)}`
        );


        renderAllInventories();

      }

    }
  );


  slot.addEventListener(
    "contextmenu",
    (event) => {

      event.preventDefault();


      openContextMenu(
        event,
        source,
        stack.item
      );

    }
  );


  return slot;

}


// ==================================================
// 31. 빈 슬롯 생성
// ==================================================

function createEmptyStorageSlot() {

  const slot =
    document.createElement(
      "div"
    );


  slot.className =
    "storage-slot empty";


  return slot;

}


// ==================================================
// 32. 모든 가방 UI 갱신
// ==================================================

function renderAllInventories() {

  renderInventory();

  renderHomeInventory();

  renderStorage();

  updateShopOwnedCounts();

}


// ==================================================
// 33. 아이템 좌클릭
// ==================================================

function handleItemLeftClick(itemId) {

  const info =
    itemData[itemId];


  if (!info) {

    return;

  }


  if (
    focusedItem === itemId
  ) {

    focusedItem = null;


    if (
      selectedItem === itemId
    ) {

      selectedItem = null;

    }


    renderAllInventories();

    return;

  }


  focusedItem =
    itemId;


  if (
    info.selectable
  ) {

    selectedItem =
      itemId;

  }

  else {

    selectedItem =
      null;

  }


  renderAllInventories();

}


// ==================================================
// 34. 우클릭 메뉴
// ==================================================

function openContextMenu(
  event,
  source,
  itemId
) {

  const info =
    itemData[itemId];


  if (!info) {

    return;

  }


  contextSource =
    source;


  contextItemId =
    itemId;


  const sourceContainer =
    source === "inventory"
      ? inventory
      : storage;


  const amount =
    getContainerCount(
      sourceContainer,
      itemId
    );


  contextItemIcon.textContent =
    info.icon;


  contextItemName.textContent =
    info.name;


  contextItemCount.textContent =
    `보유: ${amount}`;


  if (
    source === "inventory"
  ) {

    contextMoveOne.textContent =
      "📦 보관함으로 1개 이동";


    contextMoveAll.textContent =
      "📦 보관함으로 전부 이동";

  }

  else {

    contextMoveOne.textContent =
      "🎒 가방으로 1개 이동";


    contextMoveAll.textContent =
      "🎒 가방으로 전부 이동";

  }


  itemContextMenu.classList.add(
    "open"
  );


  const menuWidth = 220;
  const menuHeight = 190;


  let x = event.clientX;
  let y = event.clientY;


  if (
    x + menuWidth >
    window.innerWidth - 10
  ) {

    x =
      window.innerWidth -
      menuWidth -
      10;

  }


  if (
    y + menuHeight >
    window.innerHeight - 10
  ) {

    y =
      window.innerHeight -
      menuHeight -
      10;

  }


  itemContextMenu.style.left =
    `${Math.max(10, x)}px`;


  itemContextMenu.style.top =
    `${Math.max(10, y)}px`;

}


// ==================================================
// 35. 우클릭 메뉴 닫기
// ==================================================

function closeContextMenu() {

  itemContextMenu.classList.remove(
    "open"
  );


  contextSource = null;
  contextItemId = null;

}


// ==================================================
// 36. 아이템 이동
// ==================================================

function moveContextItem(moveAll) {

  if (
    !contextSource ||
    !contextItemId
  ) {

    return;

  }


  const sourceType =
    contextSource;


  const itemId =
    contextItemId;


  const info =
    itemData[itemId];


  const source =
    sourceType === "inventory"
      ? inventory
      : storage;


  const destination =
    sourceType === "inventory"
      ? storage
      : inventory;


  const destinationLimit =
    sourceType === "inventory"
      ? STORAGE_SLOTS
      : INVENTORY_SLOTS;


  const sourceAmount =
    getContainerCount(
      source,
      itemId
    );


  if (
    sourceAmount <= 0
  ) {

    closeContextMenu();

    return;

  }


  const wantedAmount =
    moveAll
      ? sourceAmount
      : 1;


  const capacity =
    getAvailableCapacity(
      destination,
      destinationLimit,
      itemId
    );


  if (
    capacity <= 0
  ) {

    if (
      sourceType === "storage"
    ) {

      showMessage(
        "🎒 가방이 꽉 찼어요!"
      );

    }

    else {

      showMessage(
        "📦 보관함이 꽉 찼어요!"
      );

    }


    closeContextMenu();

    return;

  }


  const moveAmount =
    Math.min(
      wantedAmount,
      capacity
    );


  const added =
    addToContainer(
      destination,
      destinationLimit,
      itemId,
      moveAmount
    );


  if (
    added <= 0
  ) {

    closeContextMenu();

    return;

  }


  removeFromContainer(
    source,
    itemId,
    added
  );


  if (
    sourceType === "inventory" &&
    getItemCount(itemId) <= 0
  ) {

    if (
      selectedItem === itemId
    ) {

      selectedItem = null;

    }


    if (
      focusedItem === itemId
    ) {

      focusedItem = null;

    }

  }


  renderAllInventories();

  saveGame();


  if (
    sourceType === "inventory"
  ) {

    showMessage(
      `📦 ${info.name} ×${added} 보관`
    );

  }

  else {

    showMessage(
      `🎒 ${info.name} ×${added} 꺼냄`
    );

  }


  closeContextMenu();

}


// ==================================================
// 37. 우클릭 메뉴 버튼
// ==================================================

contextMoveOne.addEventListener(
  "click",
  () => {

    moveContextItem(false);

  }
);


contextMoveAll.addEventListener(
  "click",
  () => {

    moveContextItem(true);

  }
);


contextCancel.addEventListener(
  "click",
  () => {

    closeContextMenu();

  }
);


document.addEventListener(
  "click",
  (event) => {

    if (
      !itemContextMenu.contains(
        event.target
      )
    ) {

      closeContextMenu();

    }

  }
);


document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closeContextMenu();

    }

  }
);


// ==================================================
// 38. 가방 열기 / 닫기
// ==================================================

inventoryButton.addEventListener(
  "click",
  () => {

    inventoryPanel.classList.add(
      "open"
    );

  }
);


inventoryClose.addEventListener(
  "click",
  () => {

    inventoryPanel.classList.remove(
      "open"
    );

  }
);


// ==================================================
// 39. 우리 집
// ==================================================

homeButton.addEventListener(
  "click",
  () => {

    homeSection.classList.add(
      "open"
    );


    renderAllInventories();


    homeSection.scrollIntoView({

      behavior: "smooth",
      block: "start"

    });

  }
);


homeClose.addEventListener(
  "click",
  () => {

    homeSection.classList.remove(
      "open"
    );


    closeContextMenu();

  }
);


// ==================================================
// 40. 텃밭 버튼
// ==================================================

farmButton.addEventListener(
  "click",
  () => {

    farmSection.scrollIntoView({

      behavior: "smooth",
      block: "start"

    });

  }
);


// ==================================================
// 41. 연못
// ==================================================

pondButton.addEventListener(
  "click",
  () => {

    pondSection.classList.add(
      "open"
    );


    pondSection.scrollIntoView({

      behavior: "smooth",
      block: "start"

    });

  }
);


pondClose.addEventListener(
  "click",
  () => {

    pondSection.classList.remove(
      "open"
    );

  }
);

// ========================================
// 숲 열기 / 닫기
// ========================================

forestButton.addEventListener(
  "click",
  () => {

    forestSection.classList.add(
      "open"
    );


    forestSection.scrollIntoView({

      behavior: "smooth",
      block: "start"

    });

  }
);


forestClose.addEventListener(
  "click",
  () => {

    forestSection.classList.remove(
      "open"
    );

  }
);

// ========================================
// 숲 채집
// ========================================

let isGathering = false;


function getRandomGatheringItem() {

  const random = Math.random() * 100;

  // 🪵 나뭇가지 45%
  if (random < 45) {
    return "branch";
  }

  // 🌿 허브 30%
  if (random < 75) {
    return "herb";
  }

  // 🍄 버섯 20%
  if (random < 95) {
    return "mushroom";
  }

  // 🫐 베리 5%
  return "berry";
}


gatheringButton.addEventListener(
  "click",
  () => {

    if (isGathering) {
      return;
    }

    isGathering = true;

    gatheringButton.disabled = true;

    gatheringButton.textContent =
      "🔍 채집하는 중...";

    gatheringStatus.textContent =
      "🌲 숲을 천천히 살펴보고 있어요...";


    // 2~4초 사이의 랜덤한 채집 시간
    const gatheringTime =
      2000 + Math.random() * 2000;


    setTimeout(() => {

      const foundItem =
        getRandomGatheringItem();

      const item =
        itemData[foundItem];


      // 가방 공간 확인
      if (!canInventoryAccept(foundItem)) {

        gatheringStatus.textContent =
          "🎒 가방이 꽉 차서 더 이상 채집할 수 없어요.";

        showMessage(
          "🎒 가방이 꽉 찼어요!"
        );

      } else {

        addItem(
          foundItem,
          1
        );

        addXP(10);

        gatheringStatus.textContent =
          `${item.icon} ${item.name}을(를) 발견했어요!`;

        showMessage(
          `${item.icon} ${item.name} 1개를 채집했어요! +10 XP`
        );

        saveGame();

      }


      gatheringButton.textContent =
        "🌲 채집하기";

      gatheringButton.disabled = false;

      isGathering = false;

    }, gatheringTime);

  }
);


// ==================================================
// 42. 상점
// ==================================================

shopButton.addEventListener(
  "click",
  () => {

    shopSection.classList.add(
      "open"
    );


    updateShopOwnedCounts();


    shopSection.scrollIntoView({

      behavior: "smooth",
      block: "start"

    });

  }
);


shopClose.addEventListener(
  "click",
  () => {

    shopSection.classList.remove(
      "open"
    );

  }
);


// ==================================================
// 43. 씨앗 구매
// ==================================================

buyButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const itemId =
          button.dataset.item;


        const price =
          Number(
            button.dataset.price
          );


        const info =
          itemData[itemId];


        if (
          gold < price
        ) {

          showMessage(
            "💰 골드가 부족해요!"
          );

          return;

        }


        if (
          !canInventoryAccept(
            itemId
          )
        ) {

          showMessage(
            "🎒 가방이 꽉 찼어요!"
          );

          return;

        }


        const added =
          addItem(
            itemId,
            1
          );


        if (!added) {

          showMessage(
            "🎒 가방이 꽉 찼어요!"
          );

          return;

        }


        gold -= price;


        updateGold();

        saveGame();


        showMessage(
          `${info.name}을 구매했어요!`
        );

      }
    );

  }
);


// ==================================================
// 44. 1개 판매
// ==================================================

sellOneButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const itemId =
          button.dataset.item;


        const price =
          Number(
            button.dataset.price
          );


        const info =
          itemData[itemId];


        const owned =
          getItemCount(
            itemId
          );


        if (
          owned <= 0
        ) {

          showMessage(
            `${info.name}이 가방에 없어요!`
          );

          return;

        }


        const removed =
          removeItem(
            itemId,
            1
          );


        if (!removed) {

          return;

        }


        gold += price;


        updateGold();

        updateShopOwnedCounts();

        saveGame();


        showMessage(
          `${info.icon} ${info.name} 1개 판매! +${price}G`
        );

      }
    );

  }
);


// ==================================================
// 45. 전부 판매
// ==================================================

sellAllButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        const itemId =
          button.dataset.item;


        const price =
          Number(
            button.dataset.price
          );


        const info =
          itemData[itemId];


        const owned =
          getItemCount(
            itemId
          );


        if (
          owned <= 0
        ) {

          showMessage(
            `${info.name}이 가방에 없어요!`
          );

          return;

        }


        const totalGold =
          owned *
          price;


        const removed =
          removeItem(
            itemId,
            owned
          );


        if (!removed) {

          return;

        }


        gold +=
          totalGold;


        updateGold();

        updateShopOwnedCounts();

        saveGame();


        showMessage(
          `${info.icon} ${info.name} ${owned}개 전부 판매! +${totalGold}G`
        );

      }
    );

  }
);


// ==================================================
// 46. 밭 렌더링
// ==================================================

function renderPlot(index) {

  const plot =
    plotCards[index];


  const plotData =
    farmPlots[index];


  if (
    plotData.state === "empty" ||
    !plotData.seedId
  ) {

    plotData.state =
      "empty";


    plot.innerHTML = `

      <strong>
        빈 밭
      </strong>

      <span>
        눌러서 심기
      </span>

    `;


    return;

  }


  const crop =
    cropData[
      plotData.seedId
    ];


  if (!crop) {

    farmPlots[index] = {

      state: "empty",
      seedId: null,
      plantedAt: null

    };


    renderPlot(index);

    return;

  }


  const elapsed =
    Date.now() -
    plotData.plantedAt;


  if (
    elapsed >=
    crop.growTime2
  ) {

    plotData.state =
      "ready";


    plot.innerHTML = `

      <strong>
        ${crop.readyIcon}
      </strong>

      <span>
        ${crop.name}
      </span>

      <span>
        수확 가능!
      </span>

    `;


    return;

  }


  if (
    elapsed >=
    crop.growTime1
  ) {

    plotData.state =
      "grown";


    plot.innerHTML = `

      <strong>
        ${crop.grownIcon}
      </strong>

      <span>
        ${crop.name}
      </span>

      <span>
        자라는 중
      </span>

    `;


    return;

  }


  plotData.state =
    "growing";


  plot.innerHTML = `

    <strong>
      ${crop.growingIcon}
    </strong>

    <span>
      ${crop.name}
    </span>

    <span>
      자라는 중
    </span>

  `;

}


// ==================================================
// 47. 밭 갱신
// ==================================================

function updateFarm() {

  for (
    let i = 0;
    i < plotCards.length;
    i++
  ) {

    renderPlot(i);

  }

}


// ==================================================
// 48. 작물 심기
// ==================================================

function plantCrop(
  index,
  seedId
) {

  const crop =
    cropData[seedId];


  if (!crop) {

    return;

  }


  const removed =
    removeItem(
      seedId,
      1
    );


  if (!removed) {

    return;

  }


  farmPlots[index] = {

    state: "growing",

    seedId: seedId,

    plantedAt: Date.now()

  };


  renderPlot(index);

  saveGame();


  showMessage(
    `🌱 ${crop.name}을 심었어요!`
  );

}


// ==================================================
// 49. 작물 수확
// ==================================================

function harvestCrop(index) {

  const plotData =
    farmPlots[index];


  if (
    plotData.state !==
    "ready"
  ) {
    return;
  }


  const crop =
    cropData[
      plotData.seedId
    ];


  if (!crop) {
    return;
  }


  // ========================================
  // 돌 화분 효과
  // ========================================

const planterBonus =
  hasPlacedFurniture(
    "stone-planter"
  );

const planterLampBonus =
  hasLampNextToFurniture(
    "stone-planter"
  );

const bonusChance =
  planterLampBonus
    ? 0.3
    : 0.2;

let harvestAmount = 1;
let bonusHarvest = false;

if (
  planterBonus &&
  Math.random() < bonusChance
) {
  harvestAmount += 1;
  bonusHarvest = true;
}


  // ========================================
  // 작물 지급
  // ========================================

  const added =
    addItem(
      crop.harvestItem,
      harvestAmount
    );


  if (!added) {

    showMessage(
      "🎒 가방이 꽉 찼어요!"
    );

    return;

  }


  // ========================================
  // 밭 초기화
  // ========================================

  farmPlots[index] = {

    state: "empty",

    seedId: null,

    plantedAt: null

  };


  renderPlot(index);


  // 작물 수확 경험치
  addXP(10);

  saveGame();


  // ========================================
  // 수확 메시지
  // ========================================

  if (bonusHarvest) {

    showMessage(
      `🌱 초록빛 실내 효과! ${crop.readyIcon} ${crop.name} ×2 수확! +10 XP`
    );

  } else {

    showMessage(
      `${crop.readyIcon} ${crop.name} 수확! +10 XP`
    );

  }

}


// ==================================================
// 50. 밭 클릭
// ==================================================

plotCards.forEach(
  (plot, index) => {

    plot.addEventListener(
      "click",
      () => {

        const plotData =
          farmPlots[index];


        if (
          plotData.state ===
          "ready"
        ) {

          harvestCrop(index);

          return;

        }


        if (
          plotData.state !==
          "empty"
        ) {

          showMessage(
            "🌱 아직 자라고 있어요."
          );

          return;

        }


        if (!selectedItem) {

          showMessage(
            "🌱 씨앗을 먼저 선택해주세요."
          );

          return;

        }


        if (
          !cropData[
            selectedItem
          ]
        ) {

          showMessage(
            "이 아이템은 심을 수 없어요."
          );

          return;

        }


        if (
          getItemCount(
            selectedItem
          ) <= 0
        ) {

          selectedItem = null;
          focusedItem = null;


          renderAllInventories();


          showMessage(
            "씨앗이 없어요!"
          );


          return;

        }


        const seedToPlant =
          selectedItem;


        plantCrop(
          index,
          seedToPlant
        );

      }
    );

  }
);


// ==================================================
// 51. 랜덤 물고기
// ==================================================

function getRandomFish() {

  const random =
    Math.random() * 100;


  // ============================================
  // 🎣 낚시꾼 전용 어획 확률
  // ============================================

  if (job === "fisher") {

    if (random < 50) {
      return "crucian";
    }

    if (random < 75) {
      return "minnow";
    }

    if (random < 90) {
      return "shrimp";
    }

    return "golden-crucian";

  }


  // ============================================
  // 일반 어획 확률
  // ============================================

  if (random < 60) {
    return "crucian";
  }

  if (random < 90) {
    return "minnow";
  }

  return "golden-crucian";

}


// ==================================================
// 52. 낚시 시작
// ==================================================

function startFishing() {

  if (
    !hasFishingSpace()
  ) {

    showMessage(
      "🎒 가방이 꽉 찼어요!"
    );


    fishingStatus.textContent =
      "먼저 집의 보관함에 물건을 정리해주세요.";


    return;

  }


  fishingState =
    "waiting";


  fishingButton.disabled =
    true;


  fishingButton.textContent =
    "🎣 기다리는 중...";


  fishingStatus.textContent =
    "찌를 던졌어요. 조용히 기다려보세요...";


  pondVisual.textContent =
    "～～～ 🎣 ～～～";


  const waitingTime =
    2000 +
    Math.random() *
    3000;


  biteTimer =
    setTimeout(
      () => {

        startBite();

      },
      waitingTime
    );

}


// ==================================================
// 53. 입질
// ==================================================

function startBite() {

  fishingState =
    "bite";


  fishingButton.disabled =
    false;


  fishingButton.classList.add(
    "bite"
  );


  fishingButton.textContent =
    "❗ 지금 당기기!";


  fishingStatus.textContent =
    "❗ 입질이 왔어요! 빨리 당기세요!";


  pondVisual.textContent =
    "～～ ❗🐟 ～～";


  escapeTimer =
    setTimeout(
      () => {

        fishEscaped();

      },
      2000
    );

}


// ==================================================
// 54. 물고기 도망
// ==================================================

function fishEscaped() {

  fishingState =
    "idle";


  fishingButton.disabled =
    false;


  fishingButton.classList.remove(
    "bite"
  );


  fishingButton.textContent =
    "🎣 낚시하기";


  fishingStatus.textContent =
    "💨 물고기가 도망갔어요!";


  pondVisual.textContent =
    "～～～ 💨 ～～～";


  showMessage(
    "💨 너무 늦었어요!"
  );

}


// ==================================================
// 55. 물고기 잡기
// ==================================================

function catchFish() {

  clearTimeout(
    escapeTimer
  );


  const fishId =
    getRandomFish();


  const fish =
    itemData[fishId];


  if (
    !canInventoryAccept(
      fishId
    )
  ) {

    fishingState =
      "idle";


    fishingButton.disabled =
      false;


    fishingButton.classList.remove(
      "bite"
    );


    fishingButton.textContent =
      "🎣 낚시하기";


    fishingStatus.textContent =
      "🎒 가방에 물고기를 넣을 공간이 없어요.";


    pondVisual.textContent =
      "～～～ 🎒 ～～～";


    showMessage(
      "🎒 가방이 꽉 찼어요!"
    );


    return;

  }


const added =
  addItem(
    fishId,
    1
  );


if (!added) {

  showMessage(
    "🎒 가방이 꽉 찼어요!"
  );

  return;

}


// 낚시 성공 경험치
addXP(10);


fishingState =
  "idle";


  fishingButton.disabled =
    false;


  fishingButton.classList.remove(
    "bite"
  );


  fishingButton.textContent =
    "🎣 다시 낚시하기";


  fishingStatus.textContent =
    `${fish.icon} ${fish.name}을 잡았어요!`;


  pondVisual.textContent =
    `～～ ${fish.icon} ～～`;


showMessage(
  `${fish.icon} ${fish.name} 획득! +10 XP`
);

}


// ========================================
// 공방 열기
// ========================================

workshopButton?.addEventListener(
  "click",
  () => {

    // 공방 열기
    workshopSection?.classList.add(
      "open"
    );

    // 공방 위치로 자동 이동
    workshopSection?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
);


// ========================================
// 공방 닫기
// ========================================

workshopClose?.addEventListener(
  "click",
  () => {

    workshopSection?.classList.remove(
      "open"
    );

  }
);

// ==================================================
// 56. 낚시 버튼
// ==================================================

fishingButton.addEventListener(
  "click",
  () => {

    if (
      fishingState ===
      "idle"
    ) {

      startFishing();

      return;

    }


    if (
      fishingState ===
      "bite"
    ) {

      catchFish();

    }

  }
);


// ==================================================
// 57. 밭 자동 갱신
// ==================================================

setInterval(
  () => {

    updateFarm();

  },
  500
);


// ==================================================
// 58. 종료 직전 저장
// ==================================================

window.addEventListener(
  "beforeunload",
  () => {

    // 플레이 데이터 삭제 중에는
    // 기존 데이터를 다시 저장하지 않는다.
    if (isDeletingSave) {
      return;
    }

    saveGame();

  }
);


// ==================================================
// 59. 게임 시작
// ==================================================

loadGame();
renderFurnitureInventory();
updateSleepButton();

updateFurnitureEffects();

// 처음 시계 표시
updateGameClock();
updateTimeTheme();


// ========================================
// 저장된 의뢰 불러오기 / 최초 생성
// ========================================

if (
  villageRequests.length === 0
) {

  generateRequests();

  // 처음 생성한 의뢰도 즉시 저장
  saveGame();

}

else {

  renderRequests();

}

updateGold();
updateLevelDisplay();
checkJobUnlock();
updateJobDisplay();
function addXP(amount) {

  xp += amount;

  while (xp >= getRequiredXP()) {

    xp -= getRequiredXP();
    level += 1;

    console.log(`레벨 업! Lv. ${level}`);

  }

  updateLevelDisplay();

  // Lv.5 직업 해금 확인
  checkJobUnlock();

  saveGame();

}

function checkJobUnlock() {

  if (
    level >= 5 &&
    job === null
  ) {

    if (!jobUnlocked) {

      jobUnlocked = true;

      showMessage(
        "🎉 새로운 직업을 선택할 수 있게 되었어요!"
      );

      saveGame();

    }

    jobSelectOverlay.classList.add(
      "is-open"
    );

  }

}

function selectJob(selectedJob) {

  // 이미 직업이 있으면 다시 선택하지 않음
  if (job !== null) {
    return;
  }

job = selectedJob;

// 상단의 현재 직업 표시 갱신
updateJobDisplay();

saveGame();

jobSelectOverlay.classList.remove(
  "is-open"
);

  const jobNames = {
    farmer: "🌾 농부",
    fisher: "🎣 낚시꾼",
    rancher: "🐄 목장주"
  };

  showMessage(
    `🎉 ${jobNames[job]} 직업을 선택했어요!`
  );

}

jobCards.forEach((card) => {

  card.addEventListener(
    "click",
    () => {

      const selectedJob =
        card.dataset.job;

      selectJob(selectedJob);

    }
  );

});

updateAnimalFarm();

renderAllInventories();

updateFarm();

updateChicken();
updateCow();

// 닭과 소 상태를 0.5초마다 갱신

setInterval(() => {

  updateChicken();
  updateCow();

}, 500);

// =========================================
// 설정 / 플레이 데이터 삭제
// =========================================

const settingsButton =
  document.querySelector("#settingsButton");

const settingsOverlay =
  document.querySelector("#settingsOverlay");

const settingsClose =
  document.querySelector("#settingsClose");

const deleteSaveButton =
  document.querySelector("#deleteSaveButton");

const deleteSaveOverlay =
  document.querySelector("#deleteSaveOverlay");

const cancelDeleteButton =
  document.querySelector("#cancelDeleteButton");

const confirmDeleteButton =
  document.querySelector("#confirmDeleteButton");


// 설정 열기
settingsButton?.addEventListener("click", () => {
  settingsOverlay?.classList.add("is-open");
});


// 설정 닫기
settingsClose?.addEventListener("click", () => {
  settingsOverlay?.classList.remove("is-open");
});


// 설정창 바깥 클릭 → 닫기
settingsOverlay?.addEventListener("click", (event) => {
  if (event.target === settingsOverlay) {
    settingsOverlay.classList.remove("is-open");
  }
});


// 플레이 데이터 삭제 버튼
deleteSaveButton?.addEventListener("click", () => {
  settingsOverlay?.classList.remove("is-open");
  deleteSaveOverlay?.classList.add("is-open");
});


// 삭제 취소
cancelDeleteButton?.addEventListener("click", () => {
  deleteSaveOverlay?.classList.remove("is-open");
  settingsOverlay?.classList.add("is-open");
});


// 삭제 확인창 바깥 클릭 → 닫기
deleteSaveOverlay?.addEventListener("click", (event) => {
  if (event.target === deleteSaveOverlay) {
    deleteSaveOverlay.classList.remove("is-open");
  }
});


// 실제 플레이 데이터 삭제
confirmDeleteButton?.addEventListener("click", () => {

  // 삭제 직후 beforeunload에서
  // 기존 데이터를 다시 저장하지 못하도록 표시
  isDeletingSave = true;

  // 저장 데이터 삭제
  localStorage.removeItem(SAVE_KEY);

  // 새 게임 상태로 새로고침
  location.reload();
});

// =========================
// 유저 상점 연동
// =========================

window.latteGame = {

  addGold(amount) {
  const value = Number(amount);

  if (!Number.isFinite(value) || value <= 0) {
    return false;
  }

  gold += value;

  updateGold();
  saveGame();

  return true;
},

  getInventory() {
    return inventory;
  },

  getItemData() {
    return itemData;
  },

  getItemCount(itemId) {
    return getItemCount(itemId);
  },

  removeItem(itemId, amount) {
    return removeItem(itemId, amount);
  },

  getGold() {
    return gold;
  },

  canReceiveItem(itemId, amount = 1) {

    // 존재하지 않는 아이템 ID 방지
    if (!itemData[itemId]) {
      console.error(
        "존재하지 않는 아이템 ID:",
        itemId
      );

      return false;
    }

    return getAvailableCapacity(
      inventory,
      INVENTORY_SLOTS,
      itemId
    ) >= amount;
  },

  buyMarketItem(itemId, amount, totalPrice) {

    console.log(
      "🛒 로컬 구매 처리:",
      {
        itemId,
        amount,
        totalPrice
      }
    );

    // 아이템 자체가 게임에 존재하는지 확인
    if (!itemData[itemId]) {

      console.error(
        "❌ itemData에 없는 아이템:",
        itemId
      );

      return false;
    }

    // 골드 확인
    if (gold < totalPrice) {

      console.error(
        "❌ 골드 부족"
      );

      return false;
    }

    // 가방 공간 확인
    if (
      getAvailableCapacity(
        inventory,
        INVENTORY_SLOTS,
        itemId
      ) < amount
    ) {

      console.error(
        "❌ 가방 공간 부족"
      );

      return false;
    }

    // 아이템 지급
    const added = addItem(
      itemId,
      amount
    );

    if (
      !added ||
      added < amount
    ) {

      console.error(
        "❌ 아이템 추가 실패:",
        {
          itemId,
          requested: amount,
          added
        }
      );

      return false;
    }

    // 골드 차감
    gold -= totalPrice;

    updateGold();
    renderAllInventories();
    saveGame();

    console.log(
      "✅ 로컬 구매 완료:",
      itemId
    );

    return true;
  }

};

console.log(
  "🎮 latteGame 연결 완료:",
  window.latteGame
);

// ========================================
// 광산 열기 / 닫기
// ========================================

if (mineButton && mineSection) {

  mineButton.addEventListener(
    "click",
    () => {

      mineSection.classList.add(
        "open"
      );

      mineSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }
  );

}


if (mineClose && mineSection) {

  mineClose.addEventListener(
    "click",
    () => {

      mineSection.classList.remove(
        "open"
      );

    }
  );

}

// ========================================
// 의뢰 게시판 열기 / 닫기
// ========================================

if (
  requestBoardButton &&
  requestBoardSection
) {

  requestBoardButton.addEventListener(
    "click",
    () => {

      requestBoardSection.classList.add(
        "open"
      );

      requestBoardSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }
  );

}


if (
  requestBoardClose &&
  requestBoardSection
) {

  requestBoardClose.addEventListener(
    "click",
    () => {

      requestBoardSection.classList.remove(
        "open"
      );

    }
  );

}

// ========================================
// 채굴 미니게임
// ========================================

const miningGame =
  document.querySelector("#miningGame");

const miningGauge =
  document.querySelector("#miningGauge");

const miningGoodZone =
  document.querySelector(
    ".mining-good-zone"
  );

const miningPerfectZone =
  document.querySelector(
    ".mining-perfect-zone"
  );

const miningMarker =
  document.querySelector("#miningMarker");

const miningHitButton =
  document.querySelector("#miningHitButton");

const miningResult =
  document.querySelector("#miningResult");


let miningGameActive = false;

let miningMarkerPosition = 0;

let miningDirection = 1;

let miningAnimationId = null;

let miningLastTime = 0;


// ========================================
// 곡괭이별 채굴 판정 영역 표시
// ========================================

function updateMiningZones() {

  const perfectHalfWidth =
    5 + pickaxeLevel;

  const goodHalfWidth =
    15 + (pickaxeLevel * 2);


  const perfectWidth =
    perfectHalfWidth * 2;

  const goodWidth =
    goodHalfWidth * 2;


  miningPerfectZone.style.left =
    `${50 - perfectHalfWidth}%`;

  miningPerfectZone.style.width =
    `${perfectWidth}%`;


  miningGoodZone.style.left =
    `${50 - goodHalfWidth}%`;

  miningGoodZone.style.width =
    `${goodWidth}%`;

}

// ========================================
// 채굴 시작
// ========================================

// ========================================
// 채굴 버튼
// ========================================

miningHitButton?.addEventListener(
  "click",
  () => {

    // ------------------------------------
    // 1. 아직 채굴 중이 아니라면 시작
    // ------------------------------------

    if (!miningGameActive) {

      updateMiningZones();

      miningGameActive = true;

      miningMarkerPosition = 0;

      miningDirection = 1;

      miningLastTime = 0;


      miningResult.textContent =
        "🎯 타이밍에 맞춰 내려치세요!";


      miningHitButton.textContent =
        "⛏️ 내려치기!";


      miningAnimationId =
        requestAnimationFrame(
          moveMiningMarker
        );


      return;

    }


    // ------------------------------------
    // 2. 채굴 중이라면 내려치기
    // ------------------------------------

    miningGameActive = false;


    cancelAnimationFrame(
      miningAnimationId
    );


    const position =
      miningMarkerPosition;


    const perfectHalfWidth =
      5 + pickaxeLevel;

    const goodHalfWidth =
      15 + (pickaxeLevel * 2);


    const perfectMin =
      50 - perfectHalfWidth;

    const perfectMax =
      50 + perfectHalfWidth;


    const goodMin =
      50 - goodHalfWidth;

    const goodMax =
      50 + goodHalfWidth;


    let result;


    if (
      position >= perfectMin &&
      position <= perfectMax
    ) {

      result = "perfect";

    }

    else if (
      position >= goodMin &&
      position <= goodMax
    ) {

      result = "good";

    }

    else {

      result = "miss";

    }


    miningHitButton.disabled =
      true;


    finishMining(
      result
    );

  }
);


// ========================================
// 게이지 움직이기
// ========================================

function moveMiningMarker(time) {

  if (!miningGameActive) {
    return;
  }


  if (!miningLastTime) {
    miningLastTime = time;
  }


  const delta =
    time - miningLastTime;


  miningLastTime = time;


  // 기본 속도
  // 숫자가 클수록 빠름
const miningSpeeds = [
  0.060, // 낡은
  0.055, // 구리
  0.050, // 철
  0.045, // 고급
  0.040  // 장인
];

const speed =
  miningSpeeds[pickaxeLevel] ??
  0.060;

  miningMarkerPosition +=
    speed *
    delta *
    miningDirection;


  // 오른쪽 끝
  if (miningMarkerPosition >= 100) {

    miningMarkerPosition = 100;

    miningDirection = -1;

  }


  // 왼쪽 끝
  if (miningMarkerPosition <= 0) {

    miningMarkerPosition = 0;

    miningDirection = 1;

  }


  miningMarker.style.left =
    `${miningMarkerPosition}%`;


  miningAnimationId =
    requestAnimationFrame(
      moveMiningMarker
    );

}





// ========================================
// 광물 결정
// ========================================

function getMiningItem() {

  let table;


  // 낡은 곡괭이
  if (pickaxeLevel === 0) {

    table = [
      ["stone", 70],
      ["copper-ore", 30]
    ];

  }


  // 구리 곡괭이
  else if (pickaxeLevel === 1) {

    table = [
      ["stone", 55],
      ["copper-ore", 30],
      ["iron-ore", 15]
    ];

  }


  // 철 곡괭이
  else if (pickaxeLevel === 2) {

    table = [
      ["stone", 45],
      ["copper-ore", 25],
      ["iron-ore", 20],
      ["gold-ore", 10]
    ];

  }


  // 고급 곡괭이
  else if (pickaxeLevel === 3) {

    table = [
      ["stone", 40],
      ["copper-ore", 22],
      ["iron-ore", 18],
      ["gold-ore", 12],
      ["gem", 8]
    ];

  }


  // 장인의 곡괭이
  else {

    table = [
      ["stone", 35],
      ["copper-ore", 20],
      ["iron-ore", 18],
      ["gold-ore", 14],
      ["gem", 10],
      ["mysterious-ore", 3]
    ];

  }


  const roll =
    Math.random() * 100;


  let total = 0;


  for (const entry of table) {

    total += entry[1];


    if (roll < total) {

      return entry[0];

    }

  }


  return "stone";

}


// ========================================
// 채굴 결과
// ========================================

function finishMining(result) {

  // MISS
  if (result === "miss") {

    miningResult.textContent =
      "💥 빗나갔어요!";


    mineStatus.textContent =
      "바위를 제대로 맞히지 못했어요.";


    showMessage(
      "💥 채굴 실패!"
    );


    // 잠시 후 다시 가능
    setTimeout(
      resetMiningGame,
      700
    );


    return;

  }


  const minedItem =
    getMiningItem();


  const info =
    itemData[minedItem];


  // PERFECT는 2개
  const amount =
    result === "perfect"
      ? 2
      : 1;


  // 필요한 만큼 들어갈 공간 확인
  if (
    getAvailableCapacity(
  inventory,
  INVENTORY_SLOTS,
  minedItem
) < amount
  ) {

    miningResult.textContent =
      "🎒 가방 공간이 부족해요!";


    showMessage(
      "🎒 가방 공간이 부족해요!"
    );


    setTimeout(
      resetMiningGame,
      700
    );


    return;

  }


  addItem(
    minedItem,
    amount
  );


  // PERFECT 경험치 보너스
  const gainedXP =
    result === "perfect"
      ? 10
      : 5;


  addXP(
    gainedXP
  );


  if (result === "perfect") {

    miningResult.textContent =
      `✨ PERFECT! ${info.icon} ${info.name} ×${amount}`;


    mineStatus.textContent =
      `완벽한 타격! ${info.name}을(를) ${amount}개 발견했어요!`;

  }

  else {

    miningResult.textContent =
      `👍 GOOD! ${info.icon} ${info.name} ×${amount}`;


    mineStatus.textContent =
      `${info.name}을(를) 발견했어요!`;

  }


  showMessage(
    `${info.icon} ${info.name} ×${amount} 획득! +${gainedXP} XP`
  );


  setTimeout(
    resetMiningGame,
    700
  );

}


// ========================================
// 다음 채굴 준비
// ========================================

function resetMiningGame() {

  miningGameActive = false;

  miningHitButton.disabled =
    false;


miningHitButton.textContent =
  "⛏️ 채굴하기";


  miningMarkerPosition = 0;


  miningMarker.style.left =
    "0%";


}

// ========================================
// 발견 가능한 광물 표시
// ========================================

function updateMineGuide() {

  const unlockLevels = {
    "stone": 0,
    "copper-ore": 0,
    "iron-ore": 1,
    "gold-ore": 2,
    "gem": 3,
    "mysterious-ore": 4
  };


  const cards =
    document.querySelectorAll(
      "[data-mine-item]"
    );


  cards.forEach(
    (card) => {

      const itemId =
        card.dataset.mineItem;

      const requiredLevel =
        unlockLevels[itemId];

      const unlocked =
        pickaxeLevel >= requiredLevel;


      if (unlocked) {

        const info =
          itemData[itemId];


        card.classList.remove(
          "locked"
        );


        card.innerHTML = `
          <span>${info.icon}</span>
          <strong>${info.name}</strong>
          <small>발견 가능</small>
        `;

      }

      else {

        card.classList.add(
          "locked"
        );


        card.innerHTML = `
          <span>🔒</span>
          <strong>???</strong>
          <small>더 좋은 곡괭이가 필요해요</small>
        `;

      }

    }
  );

}

// ========================================
// 곡괭이 화면
// ========================================

function updatePickaxeDisplay() {

  const current =
    pickaxeData[pickaxeLevel];

  updateMineGuide();    

  pickaxeIcon.textContent =
    current.icon;

  pickaxeName.textContent =
    current.name;


  // 최고 등급
  if (
    pickaxeLevel >=
    pickaxeData.length - 1
  ) {

    pickaxeUpgradeCost.textContent =
      "✨ 최고 등급 곡괭이입니다.";

    upgradePickaxeButton.disabled =
      true;

    upgradePickaxeButton.textContent =
      "✨ 최고 등급";

    return;
  }


  const next =
    pickaxeData[pickaxeLevel + 1];

  const material =
    itemData[next.material];


  pickaxeUpgradeCost.textContent =
    `${material.icon} ${material.name} ${next.materialAmount}개 + 💰 ${next.gold}G`;


  upgradePickaxeButton.disabled =
    false;

  upgradePickaxeButton.textContent =
    `🔨 ${next.name} 만들기`;

}


// ========================================
// 곡괭이 업그레이드
// ========================================

upgradePickaxeButton?.addEventListener(
  "click",
  () => {

    if (
      pickaxeLevel >=
      pickaxeData.length - 1
    ) {

      return;

    }


    const next =
      pickaxeData[pickaxeLevel + 1];


    const materialCount =
      getItemCount(
        next.material
      );


    // 재료 부족
    if (
      materialCount <
      next.materialAmount
    ) {

      const material =
        itemData[next.material];

      showMessage(
        `${material.icon} ${material.name}이(가) 부족해요!`
      );

      return;

    }


    // 골드 부족
    if (
      gold <
      next.gold
    ) {

      showMessage(
        `💰 ${next.gold - gold}G가 더 필요해요!`
      );

      return;

    }


    // 재료 소비
    removeItem(
      next.material,
      next.materialAmount
    );


    // 골드 소비
    gold -=
      next.gold;


    // 곡괭이 등급 상승
    pickaxeLevel += 1;


    updateGold();

    updatePickaxeDisplay();

    saveGame();


    showMessage(
      `${next.icon} ${next.name}을 만들었어요!`
    );

  }
);


// 처음 화면 표시
updatePickaxeDisplay();