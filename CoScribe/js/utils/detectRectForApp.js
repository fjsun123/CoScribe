/**
 * 原web调用的 【过线人数统计】 的检测框绘制入口
 * @param {number} enable 1 // 固定1，感觉无用
 * @param {*} sRegion 人物检测坐标 "id:type:x1:y1:x2:y2..." 6个一组; 传"0:0:0:0:0:0"则清空
 */
const setPersonRectRegion = function (that, enable, sRegion) {
  // 启用绘制
  that.m_bPersonRegionShow = enable;
  var pPersonRegion = sRegion.split(':');
  // a.若参数错误则清空画布
  if (pPersonRegion.length < 2 || (pPersonRegion[2] == pPersonRegion[3]
    == pPersonRegion[4] == pPersonRegion[5] && pPersonRegion.length < 7)) {
    that.m_PersonRegions = pPersonRegion;
    let c = document.getElementById('manCanvas');
    // canvas的宽高重新赋值后将清除绘制内容
    c.height = c.height;
    return;
  } else {
    // b.若参数正确
    // 选择manCanvas画布图层
    if (document.getElementById('manCanvas') == null) {
      if (document.getElementsByClassName('li0').length) {
        document.getElementsByClassName('li0')[0].insertAdjacentHTML('beforeend', '<canvas id="manCanvas" class="selCanvas"></canvas>');
      } else if (document.getElementsByClassName('li1').length) {
        document.getElementsByClassName('li1')[0].insertAdjacentHTML('beforeend', '<canvas id="manCanvas" class="selCanvas"></canvas>');
      }
    }
    if (document.getElementById('selCanvas') && !that.playMode) {
      document.getElementById('selCanvas').style.zIndex = 100;
    }
    // 检测坐标数组
    that.m_PersonRegions = pPersonRegion;
    // 调用绘制方法，RedrawCanvas内部判断m_bPersonRegionShow为true后会再调用下面的redrawObjectRegion
    that.RedrawCanvas('manCanvas');
  }
};
/**
 * 原web调用的 【区域人数统计】 的检测框绘制入口
 * @param {*} enable
 * @param {*} sRegion "id:type:x:y:w:h:alarm:exist:stayTime1:stayTime2:stayTime3:stayTime4;", 传sRegion为""则清空
 */
const setPersonRectWithTime = function (that, enable, sRegion) {
  that.m_bPersonRegionShow = enable;
  // 使用分号隔开了！！！
  var pPersonRegion = sRegion.split(';');
  if (pPersonRegion.length == 0) {
    // that.m_Tails={}; // 原轨迹绘制
    that.m_PersonRegions = pPersonRegion;
    let c = document.getElementById('manCanvas');
    c.height = c.height;
    return;
  } else {
    if (document.getElementById('manCanvas') == null) {
      document.getElementsByClassName('li0')[0].insertAdjacentHTML('beforeend', '<canvas id="manCanvas" class="selCanvas"></canvas>');
    }
    if (document.getElementById('selCanvas') && !that.playMode) {
      document.getElementById('selCanvas').style.zIndex = 100;
    }
    that.m_PersonRegions = pPersonRegion;
    that.RedrawCanvas('manCanvas'); // 同上调用绘制方法redrawObjectRegion
  }
};

/**
 * 绘制目标检测框，仅显示，无交互
 * @param {*} that
 * @param {*} ctx 画布上下文 ctx = c.getContext("2d");
 * @param {*} c 画布元素 document.getElementById("manCanvas");
 * @param {string} obj 绘制图层的元素ID名称 manCanvas|selCanvas
 * @returns
 */
const redrawObjectRegion = (that, ctx, c, obj) => {
    var that = this;
    // 清空画布
  c.height = c.height;
  // if (that.m_bEnableZoom) return; // 原判断电子放大则不绘制
  ctx.lineWidth = 2;
  ctx.font = 'bold 12px Arial';
  // 计算缩放比例
  let xparam = document.getElementById(obj).clientWidth / 320; // that.VCA_DISPLAY_WIDTH;
  let yparam = document.getElementById(obj).clientHeight / 240; // that.VCA_DISPLAY_HEIGHT;
  // that.m_PersonRegions是检测框坐标数组
  if (that.m_PersonRegions.length > 0 && that.m_PersonRegions[0].indexOf(':') != -1) {
    for (let i = 0; i < that.m_PersonRegions.length; i++) {
      var person = that.m_PersonRegions[i].split(':');
      var id = person[0];
      let objflag = person[1];
      let x = person[2] * xparam;
      let y = person[3] * yparam;
      let w = person[4] * xparam;
      let h = person[5] * yparam;
      var alarm = parseInt(person[6]);
      var stay = [];
      var k = 8,
        maxStay = 0;
      if (((person[2] == person[3]) == person[4]) == person[5]) {
        continue;
      }
      for (var j = 0; j < 4; j++) {
        if (person[7] & (1 << j)) {
          stay[j] = person[k++];
          maxStay = Math.max(maxStay, stay[j]);
        } else {
          stay[j] = 0;
        }
      }
      if (!w || !h) {
        continue;
      }
      ctx.fillStyle = '#ff0';
      ctx.strokeStyle = '#feeb04';
      
      // 原处理多区域和报警的情况
      // if (that.m_regionIndex == that.m_polygonTextNumber) {
      // 	if (alarm > 0) {
      // 		ctx.fillStyle = '#f00';
      // 		ctx.strokeStyle = '#f00';
      // 	}
      // } else {
      // 	if (alarm & (1 << that.m_regionIndex)) {
      // 		ctx.fillStyle = '#f00';
      // 		ctx.strokeStyle = '#f00';
      // 	}
      // 	maxStay = stay[that.m_regionIndex];
      // }
      ctx.fillText(id, x + 5, y + 15);
      
      // 区域人数统计的目标检测框需显示停留秒数
      if (maxStay) {
        var tx = x + w - 18; // x coordinate depend on length of text
        if (maxStay > 9999) {
          tx -= 28;
        }
        if (maxStay > 999) {
          tx -= 21;
        } else if (maxStay > 99) {
          tx -= 14;
        } else if (maxStay > 9) {
          tx -= 7;
        }
        ctx.fillText(maxStay + 's', tx, y + h - 7);
      }
      ctx.strokeRect(x, y, w, h);
    }
  } else {
    for (let i = 0; i < that.m_PersonRegions.length / 6; i++) {
      let id = that.m_PersonRegions[6 * i + 0];
      let x = that.m_PersonRegions[6 * i + 2] * xparam;
      let y = that.m_PersonRegions[6 * i + 3] * yparam;
      let w = (that.m_PersonRegions[6 * i + 4] - that.m_PersonRegions[6 * i + 2]) * xparam;
      let h = yparam * (that.m_PersonRegions[6 * i + 5] - that.m_PersonRegions[6 * i + 3]);
      let objflag = parseInt(that.m_PersonRegions[6 * i + 1]);
      let text_posx = w > 0 ? x : x + w;
      let text_posy = h > 0 ? y : y + h;
      if (!w || h == 0) {
        continue;
      }
      if (
        ((that.m_PersonRegions[6 * i + 2] == that.m_PersonRegions[6 * i + 3]) ==
          that.m_PersonRegions[6 * i + 4]) ==
        that.m_PersonRegions[6 * i + 5]
      ) {
        continue;
      }
      ctx.strokeStyle = '#02f902';
      ctx.fillStyle = '#ff0';
      
      // 原判断是否人脸检测
      // if (that.isFace) {
      // 	ctx.strokeStyle = '#f00';
      // }
      // 不同type使用不同的颜色绘制检测框
      switch (objflag) {
        case 0:
          // if (!that.isFace)
          ctx.fillText(id, text_posx + 5, text_posy + 15);
          break;
        case 1:
          ctx.strokeStyle = '#feeb04';
          ctx.fillText(id, text_posx + 5, text_posy + 15);
          break;
        case 2:
          ctx.fillStyle = '#2d8cf4';
          ctx.strokeStyle = '#2d8cf4';
          ctx.fillText(id, text_posx + 5, text_posy + 15);
          break;
        case 4:
          ctx.strokeStyle = '#ffffff';
          ctx.fillStyle = '#0000ff';
          ctx.fillText(id, text_posx + 5, text_posy + 15);
          break;
        case 5:
        case 6:
          ctx.fillStyle = '#f00';
          ctx.strokeStyle = '#f00';
          ctx.fillText(id, text_posx + 5, text_posy + 15);
          break;
        case -1:
          ctx.strokeStyle = '#f00';
          ctx.fillStyle = '#f00';
          ctx.fillText('Min. Object Size', x - 5, y - 5);
          break;
        case -3:
          ctx.fillStyle = '#0000ff';
          ctx.strokeStyle = '#0000ff';
          break;
        case -4:
          ctx.fillStyle = '#FF8000';
          ctx.strokeStyle = '#FF8000';
          break;
        case -5:
          ctx.fillStyle = '#f00';
          ctx.strokeStyle = '#f00';
          break;
        default:
          break;
      }
      ctx.strokeRect(x, y, w, h);
      
      // unused
      // var midx = x + w / 2;
      // var midy = y + h / 2;
      // var tmpMidx = midx / ctx.canvas.width;
      // var tmpMidy = midy / ctx.canvas.height;
      // var str = '' + tmpMidx + ':' + tmpMidy + ':';
      
      // unused
      // switch (id % 3) {
      // 	case 0:
      // 		ctx.storkeStyle = '#ec942b';
      // 		break;
      // 	case 1:
      // 		ctx.strokeStyle = '#699806';
      // 		break;
      // 	case 2:
      // 		ctx.strokeStyle = '#28c5f1';
      // 		break;
      // }
      
    }
  }
  if (that.playMode == 1) {
    that.m_bPersonRegionShow = false;
  }
};

export {redrawObjectRegion};
