<template>
  <div>
    <div class="game">
      <Transition>
        <div class="message" v-if="message">
          {{ message }}
          <pre v-if="grid">{{ grid }}</pre>
        </div>
      </Transition>
      <div id="board">
        <div
            v-for="(row, index) in board"
            :class="[
          'row',
          shakeRowIndex === index && 'shake',
          success && currentRowIndex === index && 'jump'
        ]"
        >
          <div
              v-for="(tile, index) in row"
              :class="['tile', tile.letter && 'filled', tile.state && 'revealed']"
          >
            <div class="front" :style="{ transitionDelay: `${index * 300}ms` }">
              {{ tile.letter }}
            </div>
            <div
                :class="['back', tile.state]"
                :style="{
              transitionDelay: `${index * 300}ms`,
              animationDelay: `${index * 100}ms`
            }"
            >
              {{ tile.letter }}
            </div>
          </div>
        </div>
      </div>
      <Keyboard  @key="onKey" :letterStates="letterStates" :key="keyComponent"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Keyboard from '@/components/Keyboard.vue'
import {GameState, LetterState} from './types'
import {allWords, getWordOfTheDay} from './words'


@Component({
  components: {
    Keyboard
  }
})
export default class Game extends Vue {

  answer: string = '';
  // Board state. Each tile is represented as { letter, state }
  board: Array<Array<{letter: string, state: LetterState}>> =
    Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () => ({
        letter: '',
        state: LetterState.INITIAL
      }))
    );
  currentRowIndex: number = 0;
  get currentRow() {
    return this.board[this.currentRowIndex]
  }
  // Keep track of revealed letters for the virtual keyboard
  letterStates: Record<string, LetterState> = {};
  keyComponent: number = 0;
  // Feedback state: message and shake
  message: string = '';
  grid: string = '';
  shakeRowIndex: number = -1;
  success: boolean = false;

  // Handle keyboard input.
  allowInput: boolean = true;
  icons: { [k: string]: any} = {
    [LetterState.CORRECT]: '🟩',
    [LetterState.PRESENT]: '🟨',
    [LetterState.ABSENT]: '⬜',
    [LetterState.INITIAL]: null
  };
  state: GameState = GameState.IN_PROCESS;


  onKey(key: string) {
    if (!this.allowInput) return
    if (/^[a-zA-Z]$/.test(key)) {
      this.fillTile(key.toLowerCase())
    } else if (key === 'Backspace') {
      this.clearTile()
    } else if (key === 'Enter') {
      this.completeRow()
      this.keyComponent++
      localStorage.setItem('board',JSON.stringify(this.board))
      localStorage.setItem('currentRowIndex', JSON.stringify(this.currentRowIndex))
      localStorage.setItem('letterStates', JSON.stringify(this.letterStates))
      localStorage.setItem('state', JSON.stringify(this.state))
      localStorage.setItem('allowInput', JSON.stringify(this.allowInput))
      const date = new Date()
      localStorage.setItem('date', JSON.stringify(date.getFullYear()
          + "/" + (date.getMonth() + 1)
          + "/" + date.getDate()))
    }
  }

  fillTile(letter: string) {
    for (const tile of this.currentRow) {
      if (!tile.letter) {
        tile.letter = letter
        break
      }
    }
  }

  clearTile() {
    for (const tile of [...this.currentRow].reverse()) {
      if (tile.letter) {
        tile.letter = ''
        break
      }
    }
  }

  completeRow() {
    if (this.currentRow.every((tile) => tile.letter)) {
      const guess = this.currentRow.map((tile) => tile.letter).join('')
      if (!allWords.includes(guess) && guess !== this.answer) {
        this.shake()
        this.showMessage(`Not in word list`)
        return
      }
      const answerLetters: (string | null)[] = this.answer.split('')
      // first pass: mark correct ones
      this.currentRow.forEach((tile, i) => {
        if (answerLetters[i] === tile.letter) {
          tile.state = this.letterStates[tile.letter] = LetterState.CORRECT
          answerLetters[i] = null
        }
      })
      // second pass: mark the present
      this.currentRow.forEach((tile) => {
        if (!tile.state && answerLetters.includes(tile.letter)) {
          tile.state = LetterState.PRESENT
          answerLetters[answerLetters.indexOf(tile.letter)] = null
          if (!this.letterStates[tile.letter]) {
            this.letterStates[tile.letter] = LetterState.PRESENT
          }
        }
      })
      // 3rd pass: mark absent
      this.currentRow.forEach((tile) => {
        if (!tile.state) {
          tile.state = LetterState.ABSENT
          if (!this.letterStates[tile.letter]) {
            this.letterStates[tile.letter] = LetterState.ABSENT
          }
        }
      })
      this.allowInput = false
      if (this.currentRow.every((tile) => tile.state === LetterState.CORRECT)) {
        // yay!
        this.success = true
        this.state = GameState.SUCCESS
        this.allowInput = false
        setTimeout(() => {
          this.grid = this.genResultGrid()
          this.showMessage(
              ['Genius', 'Magnificent', 'Impressive', 'Splendid', 'Great', 'Phew'][
                  this.currentRowIndex
                  ],
              -1
          )
        }, 1600)
      } else if (this.currentRowIndex < this.board.length - 1) {
          // go the next row
          this.currentRowIndex++
          this.allowInput = true

      } else {
        // game over :(
        setTimeout(() => {
          this.showMessage(this.answer.toUpperCase(), -1)
        }, 1600)
        this.state = GameState.FAIL
        this.allowInput = false
      }


    } else {
      this.shake()
      this.showMessage('Not enough letters')
    }
  }

  showMessage(msg: string, time = 1000) {
    this.message = msg
    if (time > 0) {
      setTimeout(() => {
        this.message = ''
      }, time)
    }
  }

  shake() {
    this.shakeRowIndex = this.currentRowIndex
    setTimeout(() => {
      this.shakeRowIndex = -1
    }, 1000)
  }

  genResultGrid() {
    return this.board
        .slice(0, this.currentRowIndex + 1)
        .map((row) => {
          return row.map((tile) => this.icons[tile.state]).join('')
        })
        .join('\n')
  }

  onKeyup(e:KeyboardEvent) {
    this.onKey(e.key)
  }

  mounted() {

    // Get word of the day
    this.answer = getWordOfTheDay()
    const date = new Date()
    const day = JSON.parse(JSON.stringify(date.getFullYear()
        + "/" + (date.getMonth() + 1)
        + "/" + date.getDate()))

    if (localStorage.getItem('board') && (day === JSON.parse(localStorage.getItem('date')!))) {
      this.board = JSON.parse(localStorage.getItem('board')!)
      this.currentRowIndex = JSON.parse(localStorage.getItem('currentRowIndex')!)
      this.letterStates = JSON.parse(localStorage.getItem('letterStates')!)
      this.state = JSON.parse(localStorage.getItem('state')!)
      this.allowInput = JSON.parse(localStorage.getItem('allowInput')!)
    } else {
      localStorage.removeItem('board')
      localStorage.removeItem('date')
      localStorage.removeItem('currentRowIndex')
      localStorage.removeItem('letterStates')
      localStorage.removeItem('state')
      localStorage.removeItem('allowInput')
    }
    // Handle keyboard input.
    window.addEventListener('keyup', this.onKeyup)
  }

  unmounted() {
    window.removeEventListener('keyup', this.onKeyup)
  }
}


</script>

<style scoped lang="scss">

.game {
  max-width: 600px;
  margin: 0 auto;
}

#board {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;
  --height: min(420px, calc(100vh - 310px));
  height: var(--height);
  width: min(350px, calc(var(--height) / 6 * 5));
  margin: 0 auto;
}
.message {
  position: absolute;
  left: 50%;
  top: 80px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.85);
  padding: 16px 20px;
  z-index: 2;
  border-radius: 4px;
  transform: translateX(-50%);
  transition: opacity 0.3s ease-out;
  font-weight: 600;
}
.message.v-leave-to {
  opacity: 0;
}
.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
}
.tile {
  width: 100%;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  text-transform: uppercase;
  user-select: none;
  position: relative;
}
.tile.filled {
  animation: zoom 0.2s;
}
.tile .front,
.tile .back {
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.tile .front {
  border: 2px solid #d3d6da;
}
.tile.filled .front {
  border-color: #999;
}
.tile .back {
  transform: rotateX(180deg);
}
.tile.revealed .front {
  transform: rotateX(180deg);
}
.tile.revealed .back {
  transform: rotateX(0deg);
}

@keyframes zoom {
  0% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.shake {
  animation: shake 0.5s;
}
@keyframes shake {
  0% {
    transform: translate(1px);
  }
  10% {
    transform: translate(-2px);
  }
  20% {
    transform: translate(2px);
  }
  30% {
    transform: translate(-2px);
  }
  40% {
    transform: translate(2px);
  }
  50% {
    transform: translate(-2px);
  }
  60% {
    transform: translate(2px);
  }
  70% {
    transform: translate(-2px);
  }
  80% {
    transform: translate(2px);
  }
  90% {
    transform: translate(-2px);
  }
  100% {
    transform: translate(1px);
  }
}
.jump .tile .back {
  animation: jump 0.5s;
}
@keyframes jump {
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(5px);
  }
  60% {
    transform: translateY(-25px);
  }
  90% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(0px);
  }
}
@media (max-height: 680px) {
  .tile {
    font-size: 3vh;
  }
}
</style>
