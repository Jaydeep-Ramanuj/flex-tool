let parent = document.getElementsByClassName('output-parent')[0];
let form = document.getElementsByClassName('controls')[0];
let firstChild = document.getElementsByClassName('output-child')[0];
let outputArea = document.getElementsByClassName('output-area')[0];
let info = document.getElementsByClassName('info-div')[0];
let flexboxCheckbox = document.getElementById('flexbox-checkbox');
let randomHeightWidthCheckbox = document.getElementById('random-hw-checkbox');
let randomFontSizeCheckbox = document.getElementById('random-fz-checkbox');
let justifyContentProp = document.getElementById('justify-content-options');
let flexDirectionProp = document.getElementById('flex-direction-options');
let alignContentProp = document.getElementById('align-content-options');
let alignItemsProp = document.getElementById('align-items-options');
let flexWrapProp = document.getElementById('flex-wrap-options');
let alignSelfProp = document.getElementById('align-self-options');
let childOrderProp = document.getElementById('child-order');
let childCount = document.getElementById('child-count');
let childFlexGrowProp = document.getElementById('flex-grow-id');
let childFlexShrinkProp = document.getElementById('flex-shrink-id');
let childFlexBasisProp = document.getElementById('flex-basis-id');
let gapProp = document.getElementById('gap-prop');
let childSelector = document.getElementById('child-select');
let axis1 = document.getElementsByClassName('axis1')[0];
let axis2 = document.getElementsByClassName('axis2')[0];
let heightInfo = document.getElementsByClassName('height-info')[0];
let widthInfo = document.getElementsByClassName('width-info')[0];
let alignSelfInfo = document.getElementsByClassName('align-self-info')[0];
let flexGrowInfo = document.getElementsByClassName('flex-grow-info')[0];
let flexBasisInfo = document.getElementsByClassName('flex-basis-info')[0];
let flexShrinkInfo = document.getElementsByClassName('flex-shrink-info')[0];
let orderInfo = document.getElementsByClassName('order-info')[0];

let resetBtn = document.getElementsByClassName('reset-btn')[0];
let showChildInfo = document.getElementsByClassName('show-child-info')[0];

let heightArray = [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200];
let widthArray = [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200];

let colorsArray = [
  '#78B6B0',
  '#A78FC2',
  '#E8C1C8',
  '#FED6D5',
  '#FEF1E1',
  '#FE9D98',
  '#F792A7',
  '#FFF8D4',
  '#A3E1D8',
  '#89A1C3',
  '#E39F7E',
  '#F7C59C',
  '#F7C59C',
  '#EFEDC3',
  '#035689',
  '#2C769E',
  '#FFB54B',
  '#FFCC76',
  '#FFDABA',
  '#FAB894',
  '#CB99C8',
  '#A087C3',
  '#FFBA67',
  '#F7E37B',
  '#FCB4E2',
  '#F4D2BD',
  '#F7E7DB',
  '#88D5D5',
  '#DD8420',
  '#DFA829',
  '#DAD5C7',
  '#769DB2',
  '#497FA8',
];

let childrenList;
let isAxisVisible = false;
let isFlexBoxOn = false;
console.log(parent.children);
let currentChildCount = 3;
initializer();
childrenList = Array.from(parent.children);
let selectedChild = childrenList[0];

console.log(parent);
console.log(selectedChild);

function initializer() {
  addChildren(3);
  updateChildSelector(3);
}

function updateAll(e) {
  e.preventDefault();
  addFlexbox();
}

function getRandomHeightWidth() {
  childHeight = heightArray[Math.floor(Math.random() * heightArray.length)];
  childWidth = widthArray[Math.floor(Math.random() * widthArray.length)];
  return [childHeight, childWidth];
}

function getRandomFontSize() {
  fontSizeList = [
    0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3,
    2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8,
    3.9, 4,
  ];
  return (
    (randomFontSize =
      fontSizeList[Math.floor(Math.random() * fontSizeList.length)]) + 'rem'
  );
}

function addRandomFontSizedItems() {
  parent.replaceChildren();
  addChildren(5);
  Array.from(parent.children).forEach((item) => {
    item.style.height = 'max-content';
    item.style.width = 'max-content';
    item.style.display = 'block';
    item.style.padding = '10px';
    item.style.fontSize = getRandomFontSize();
  });
}

function getRandomColor() {
  color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
  return color;
}

function notifyUser(message, color = 'grey') {
  info.style.color = color;
  info.innerText = message;
  setTimeout(() => {
    info.style.color = 'transparent';
    info.innerText = '';
  }, 5000);
}

flexboxCheckbox.onchange = () => {
  addFlexbox();
  isAxisVisible = !isAxisVisible;
  isFlexBoxOn = !isFlexBoxOn;
  updateAxis();
};

childSelector.onchange = () => {
  let child = childSelector.value;
  console.log(parent.children);
  console.log(Array.from(parent.children));
  let children = Array.from(parent.children);
  selectedChild = children[child - 1];
  console.log(selectedChild);
};

childCount.onchange = () => addChildren(childCount.value);
randomHeightWidthCheckbox.onchange = () => addChildren(childCount.value);
randomFontSizeCheckbox.onchange = () => addRandomFontSizedItems();
flexDirectionProp.onchange = () => {
  let selectedOption = flexDirectionProp.value;
  updateFlexDirectionProperty(selectedOption);
  isAxisVisible = true;
  updateAxis();
};

justifyContentProp.onchange = () =>
  updateJustifyContentProperty(justifyContentProp.value);
alignItemsProp.onchange = () => updateAlignItemsProperty(alignItemsProp.value);
flexWrapProp.onchange = () => updateFlexWrapProperty(flexWrapProp.value);
alignContentProp.onchange = () =>
  updateAlignContentProperty(alignContentProp.value);
alignSelfProp.onchange = () => updateAlignSelfProperty(alignSelfProp.value);
childOrderProp.onchange = () => updateOrderProperty(childOrderProp.value);

childFlexGrowProp.oninput = () => updateFlexProp();
childFlexShrinkProp.oninput = () => updateFlexProp();
childFlexBasisProp.oninput = () => updateFlexProp();
resetBtn.onclick = () => {
  result = confirm('Are you sure you want to reset all ?');
  console.log(result);
  if (result) {
    clearAllProps();
  }
};
gapProp.oninput = () => updateGapProp();
function addFlexbox() {
  if (flexboxCheckbox.checked) {
    parent.style.display = 'flex';
    notifyUser('added flex to parent', 'green');
  } else {
    notifyUser('added block to parent', 'green');
    parent.style.display = 'block';
  }
}
function updateFlexDirectionProperty(direction) {
  parent.style.flexDirection = direction;
  notifyUser(`changed flex direction to: ${direction} `, 'green');
}

function updateJustifyContentProperty(option) {
  parent.style.justifyContent = option;
  notifyUser(`changed justify-content to: ${option} `, 'green');
}

function updateAlignItemsProperty(option) {
  parent.style.alignItems = option;
  notifyUser(`changed align-items to: ${option} `, 'green');
}

function updateFlexWrapProperty(option) {
  parent.style.flexWrap = option;
  notifyUser(`changed flex-wrap to: ${option} `, 'green');
}

function updateAlignContentProperty(option) {
  parent.style.alignContent = option;
  notifyUser(`changed align-content to: ${option} `, 'green');
}

function updateAlignSelfProperty(option) {
  selectedChild.style.alignSelf = option;
  notifyUser(`changed align-self to: ${option} `, 'green');
}
function updateOrderProperty(option) {
  selectedChild.style.order = option;
  notifyUser(`changed order to: ${option} `, 'green');
}

function updateGapProp(option) {
  parent.style.gap = gapProp.value;
  notifyUser(`changed gap to: ${option} `, 'green');
}

function addChildren(count) {
  parent.replaceChildren();
  for (i = 1; i <= count; i++) {
    newChild = document.createElement('div');
    newChild.classList.add('output-child');
    if (randomHeightWidthCheckbox.checked) {
      [childHeight, childWidth] = getRandomHeightWidth();
      newChild.style.height = childHeight + 'px';
      newChild.style.width = childWidth + 'px';
      newChild.innerText = `child${i} \n (${childWidth}px*${childHeight}px)`;
    } else {
      newChild.innerText = `child ${i}`;
    }
    newChild.style.backgroundColor = getRandomColor();
    parent.append(newChild);
  }
  currentChildCount = count;
  updateChildSelector(currentChildCount);
  childrenList = Array.from(parent.children);
}

function updateAxis() {
  if (isAxisVisible == false) {
    axis1.innerText = '';
    axis2.innerText = '';
  } else {
    if (
      flexDirectionProp.value == 'row' ||
      flexDirectionProp.value == 'row-reverse'
    ) {
      axis1.innerText = 'main-axis ----->';
      axis2.innerText = '<----- cross-axis';
      axis1.style.left =
        outputArea.clientWidth / 2 - axis1.clientWidth / 2 + 'px';
      axis2.style.top =
        outputArea.clientHeight / 2 - axis1.clientHeight / 2 + 'px';
    } else if (
      flexDirectionProp.value == 'column' ||
      flexDirectionProp.value == 'column-reverse'
    ) {
      axis1.innerText = 'cross-axis ----->';
      axis2.innerText = '<----- main-axis';
      axis1.style.left =
        outputArea.clientWidth / 2 - axis1.clientWidth / 2 + 'px';
      axis2.style.top =
        outputArea.clientHeight / 2 - axis1.clientHeight / 2 + 'px';
    }
  }
}

function updateChildSelector(count) {
  childSelector.replaceChildren();
  for (i = 1; i <= count; i++) {
    newOption = document.createElement('option');
    newOption.setAttribute('value', i + '');
    newOption.innerText = i;
    childSelector.append(newOption);
  }
  noneOption = document.createElement('option');
  noneOption.setAttribute('value', '');
  noneOption.setAttribute('disabled', '');
  noneOption.setAttribute('selected', '');
  noneOption.innerText = 'select';
  childSelector.prepend(noneOption);
}

function updateFlexProp() {
  selectedChild.style.flexGrow = childFlexGrowProp.value;
  selectedChild.style.flexShrink = childFlexShrinkProp.value;
  selectedChild.style.flexBasis = childFlexBasisProp.value;
}

function clearAllProps() {
  parent.replaceChildren();
  addChildren(3);

  form.reset();

  parent.style.removeProperty('display');
  parent.style.removeProperty('flex-direction');
  parent.style.removeProperty('justify-content');
  parent.style.removeProperty('align-items');
  parent.style.removeProperty('gap');
  parent.style.removeProperty('flex-wrap');
  parent.style.removeProperty('align-content');

  childrenList.forEach((child) => {
    child.style.removeProperty('align-self');
    child.style.removeProperty('order');
    child.style.removeProperty('flex-grow');
    child.style.removeProperty('flex-shrink');
    child.style.removeProperty('flex-basis');
  });
}

function getChildAllFlexboxProps(element) {
  heightVal = element.offsetHeight;
  widthVal = element.offsetWidth;
  alignSelfVal = element.style.alignSelf;
  flexGrowVal = element.style.flexGrow;
  flexBasisVal = element.style.flexBasis;
  flexShrinkVal = element.style.flexShrink;
  orderVal = element.style.order;

  heightInfo.innerText = 'height: ' + heightVal + 'px';
  widthInfo.innerText = 'width: ' + widthVal + 'px';
  alignSelfInfo.innerText = 'align-self: ' + (alignSelfVal || '""');
  flexGrowInfo.innerText = 'flex-grow: ' + (flexGrowVal || '""');
  flexBasisInfo.innerText = 'flex-basis: ' + (flexBasisVal || '""');
  flexShrinkInfo.innerText = 'flex-shrink: ' + (flexShrinkVal || '""');
  orderInfo.innerText = 'order: ' + (orderVal || '0');
}

this.document.onmouseover = (e) => {
  if (e.target.classList.contains('output-child')) {
    showChildInfo.style.visibility = 'visible';
    console.log(e);
    getChildAllFlexboxProps(e.target);

    console.log(e.target.offsetLeft);
    showChildInfo.style.left =
      e.target.offsetLeft + e.target.clientWidth + 10 + 'px';
    showChildInfo.style.top = e.target.offsetTop + 10 + 'px';
  } else {
    showChildInfo.style.visibility = 'hidden';
  }
};
