<template>
	<div style="text-align: center;width:100%;margin-bottom: 20px;">
		<center>
		<h5></h5>
		<!-- 计算器 -->
		<div class="calc-wrap">
			<div class="calc-in-out">
				<!-- 上一条运算记录 -->
				<p class="calc-history" title="">{{ historyData.label }}</p>
				<!-- 输入的数据 -->
				<p :class="inData.state?'active calc-in':'calc-in'">{{ inData.label }}</p>
				<!-- 输出的运算结果 -->
				<p :class="outData.state?'calc-out active':'calc-out'">{{ outData.label }}</p>
			</div>
			<table class="calc-operation" @click="ttx()">
				<thead></thead>
				<tbody>
					<tr>
						<td data-ac="cls" class="cls">C</td>
						<td data-ac="del">←</td>
						<td data-ac="sq">x<sup>2</sup></td>
						<td data-ac="mul">×</td>
					</tr>
					<tr>
						<td data-val="7">7</td>
						<td data-val="8">8</td>
						<td data-val="9">9</td>
						<td data-ac="div">÷</td>
					</tr>
					<tr>
						<td data-val="4">4</td>
						<td data-val="5">5</td>
						<td data-val="6">6</td>
						<td data-ac="plus">+</td>
					</tr>
					<tr>
						<td data-val="1">1</td>
						<td data-val="2">2</td>
						<td data-val="3">3</td>
						<td data-ac="minus">-</td>
					</tr>
						<td data-ac="per">%</td>
						<td data-val="0">0</td>
						<td data-ac="dot">.</td>
						<td data-ac="eq" class="eq">=</td>
				</tbody>
			</table>
		</div>
		</center>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				inData: {
					label: null,
					state: false,
				},
				outData: {
					label: null,
					state: true
				},
				historyData: {
					label: null,
				}
			}
		},
		mounted(){
			this.Calculator()
		},
		methods: {
			Calculator() {
				// 运算符映射
				this.op = {
					'plus': '+',
					'minus': '-',
					'mul':'*',
					'div': '/'
				}
				this.opArr = ['+', '-', '*', '/']
				// 中缀表达式
				this.infix = [];
				// 后缀表达式
				this.suffix = [];
				// 后缀表达式运算结果集
				this.result = [];
				// 存储最近的值
				this.lastVal = 0;
				// 当前已经计算完成
				this.calcDone = false;
				// 当前正在进行小数点相关值的修正
				this.curDot = false;
			},
			ttx() {
				const e = window.event;
				var elem = e.target || e.srcElement, val, action;
				var that = this
				if (elem.tagName === 'TD') {
					val = elem.getAttribute('data-val') || elem.getAttribute('data-ac');
					// 数字：0-9
					if (!isNaN(parseInt(val, 10))) {
						// 构建中缀表达式并显示
						var infixRe = that.buildInfix(parseInt(val, 10), 'add');
						that.inData.label = infixRe.join('')
						that.inData.state = true
						that.calculate();
						return;
					}
					action = val
					// 操作：清除、删除、计算等于
					if (['cls', 'del', 'eq'].indexOf(action) !== -1) {
						if (!that.infix.length) {
							return;
						}
						// 清空数据
						if (action === 'cls' || (action === 'del' && that.calcDone)) {
							that.inData.label = null;
							that.outData.label = null;
							that.resetData(); // 调用函数对数据进行清除
						}
						// 清除
						else if (action === 'del') {
							// 重新构建中缀表达式
							infixRe = that.buildInfix(that.op[action], 'del');
							that.inData.label = infixRe.join('')
							that.inData.state = true
							that.calculate();
						}
						// 等于
						else if (action === 'eq') {
							that.calculate('eq');
						}
					}// 预运算：百分比、小数点、平方
					else if (['per', 'dot', 'sq'].indexOf(action) !== -1) {
						if (!that.infix.length || that.isOp(that.lastVal)) {
							return;
						}
						if (action === 'per') {
							that.lastVal /= 100;
						} else if (action === 'sq') {
							that.lastVal *= that.lastVal;
						} else if (action === 'dot') {
							// that.curDot = true;
						}
						// 重新构建中缀表达式
						infixRe = that.buildInfix(that.lastVal, 'change');
						that.inData.label = infixRe.join('')
						that.inData.state = true
						that.calculate();
					}
					// 运算符：+ - * /
					else if (that.isOp(that.op[action])) {
						if (!that.infix.length && (that.op[action] === '*' || that.op[action] === '/')) {
							return;
						}
						infixRe = that.buildInfix(that.op[action], 'add');
						that.inData.label = infixRe.join('')
						that.inData.state = true
					}

				}
			},
			resetData: function() {
				this.infix = [];
				this.suffix = [];
				this.result = [];
				this.lastVal = 0;
				this.curDot = false;
			},
		
			// 构建中缀表达式
			buildInfix: function(val, type) {
				// 直接的点击等于运算之后，
				if (this.calcDone) {
					this.calcDone = false;
					// 再点击数字，则进行新的运算
					if (!this.isOp(val)) {
						this.resetData();
					}
					// 再点击运算符，则使用当前的结果值继续进行运算
					else {
						var re = this.result[0];
						this.resetData();
						this.infix.push(re);
					}
				}
				var newVal;
	
				// 删除操作
				if (type === 'del') {
					newVal = this.infix.pop();
					// 删除末尾一位数
					newVal = Math.floor(newVal / 10);
					if (newVal) {
						this.infix.push(newVal);
					}
			
					this.lastVal = this.infix[this.infix.length - 1];
						return this.infix;
					}
					// 添加操作，首先得判断运算符是否重复
					else if (type === 'add') {
						// 两个连续的运算符
						if (this.isOp(val) && this.isOp(this.lastVal)) {
							return this.infix;
						}
						// 两个连续的数字
						else if (!this.isOp(val) && !this.isOp(this.lastVal)) {
							newVal = this.lastVal * 10 + val;
							this.infix.pop();
							this.infix.push(this.lastVal = newVal);
		
							return this.infix;
						}
						// 首个数字正负数
						if (!this.isOp(val) && this.infix.length === 1 && (this.lastVal === '+' || this.lastVal === '-')) {
							newVal = this.lastVal === '+' ? val : 0 - val;
							this.infix.pop();
							this.infix.push(this.lastVal = newVal);
		
							return this.infix;
						}
		
					// TODO: 小数点运算
					//     if (this.isOp(val)) {
					//         this.curDot = false;
					//     }
		
					//     // 小数点
					//     if (this.curDot) {
					//         var dotLen = 0;
					//         newVal = this.infix.pop();
					//         dotLen = newVal.toString().split('.');
					//         dotLen = dotLen[1] ? dotLen[1].length : 0;
		
					//         newVal +=  val / Math.pow(10, dotLen + 1);
					//         // 修正小数点运算精确值
					//         newVal = parseFloat(newVal.toFixed(dotLen + 1));
		
					//         this.infix.push(this.lastVal = newVal);
					//         return this.infix;
					//     }
		
						this.infix.push(this.lastVal = val);
						return this.infix;
					}
			
						// 更改操作，比如%的预运算
				else if (type === 'change') {
					this.infix.pop();
					this.infix.push(this.lastVal = val);
	
					return this.infix;
				}
	
			},
			// 判断是否为运算符
			isOp: function(op) {
				return op && this.opArr.indexOf(op) !== -1;
			},
			// 判断运算符优先级
			priorHigher: function(a, b) {
				return (a === '+' || a === '-') && (b === '*' || b === '/');
			},
			// 进行运算符的运算
			opCalc: function(b, op, a) {
					return op === '+'
						? a + b
						: op === '-'
						? a - b
						: op === '*'
						? a * b
						: op === '/'
				? a / b
				: 0;
			},
			// 即时得进行运算
			calculate: function(type) {
				this.infix2Suffix();
				var suffixRe = this.calcSuffix();
				if (suffixRe) {
					this.outData.label = '=' + suffixRe
					this.outData.state = false
					// 如果是直接显示地进行等于运算
					if (type === 'eq') {
						this.inData.state = false
						this.outData.state = true
						// 设置标记：当前已经显示地进行计算
						this.calcDone = true;
						this.lastVal = suffixRe;
						// 设置历史记录
						var history = this.infix.join('') + ' = ' + suffixRe;
						this.historyData.label = history
					}
				}
			},
 
			// 中缀表达式转后缀
			infix2Suffix: function() {
				var temp = [];
				this.suffix = [];

				for (var i = 0; i < this.infix.length; i++) {
				// 数值，直接压入
					if (!this.isOp(this.infix[i])) {
						this.suffix.push(this.infix[i]);
					}
					else {
						if (!temp.length) {
							temp.push(this.infix[i]);
						}else {
							var opTop = temp[temp.length - 1];
							// 循环判断运算符优先级，将运算符较高的压入后缀表达式
							if (!this.priorHigher(opTop, this.infix[i])) {
								while (temp.length && !this.priorHigher(opTop, this.infix[i])) {
									this.suffix.push(temp.pop());
									opTop = temp[temp.length - 1];
								}
							}
							// 将当前运算符也压入后缀表达式
							temp.push(this.infix[i]);
						}
					}
				}
				// 将剩余运算符号压入
				while (temp.length) {
					this.suffix.push(temp.pop());
				}
			},
			// 后缀表达式计算
			calcSuffix: function() {
				this.result = [];
	
				for (var i = 0; i < this.suffix.length; i++) {
					// 数值，直接压入结果集
					if (!this.isOp(this.suffix[i])) {
						this.result.push(this.suffix[i]);
					}
					// 运算符，从结果集中取出两项进行运算，并将运算结果置入结果集合
					else {
						this.result.push(this.opCalc(this.result.pop(), this.suffix[i], this.result.pop()));
					}
				}
				// 此时结果集中只有一个值，即为结果
				return this.result[0];
			}
		}	
	}
</script>


<!-- 教程 -->
<!-- https://www.cnblogs.com/imwtr/p/5970865.html#top -->
<!-- 教程2 -->
<!-- https://blog.csdn.net/hello_word2/article/details/78617332 -->
<!-- 这里可以用来写专利 -->
<!-- 结构化数据的计算器方法 -->

<style>
	.calc-wrap {
		width: 100%;
		border: 1px solid #ddd;
		border-radius: 3px;
	}
	
	
	.calc-operation {
		width: 100%;
		border-collapse: collapse;
	}
	
	.calc-in-out {
		width: 100%;
		padding: 10px 20px;
		text-align: right;
		box-sizing: border-box;
		background-color: rgba(250, 250, 250, .9);
	}
	.calc-in-out p {
		overflow: hidden;
		margin: 5px;
		width: 100%;
	}
	.calc-history {
		margin-left: -20px;
		font-size: 18px;
		color: #bbb;
		border-bottom: 1px dotted #ddf;
		min-height: 23px;
	}
	
	.calc-in,
	.calc-out {
		font-size: 20px;
		color: #888;
		line-height: 39px;
		min-height: 39px;
	}
	
	.calc-in {
		color: #888;
	}
	.calc-out {
		color: #ccc;
	}
	
	.calc-in.active,
	.calc-out.active {
		font-size: 34px;
		color: #666;
	}
	
	.calc-operation td {
		padding: 10px;
		width: 25%;
		text-align: center;
		border: 1px solid #ddd;
		font-size: 26px;
		color: #888;
		cursor: pointer;
	}
	
	.calc-operation td:active {
		background-color: #ddd;
	}
	
	.calc-operation .cls {
		color: #ee8956;
	}
	
</style>
