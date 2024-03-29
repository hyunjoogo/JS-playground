const MAX_DISPLAY_COUNT = 5;
export default function SelectedLanguage(
  {
    $target, initialState
  }) {
  this.$element = document.createElement('div');
  this.$element.className = "SelectedLanguage";
  this.state = initialState;

  $target.appendChild(this.$element);


  this.setState = (nextState) => {
    this.state = nextState
    if (nextState.length > MAX_DISPLAY_COUNT) {
      const startPosition = nextState.length - MAX_DISPLAY_COUNT;
      this.state = this.state.slice(startPosition, MAX_DISPLAY_COUNT + startPosition);
    }
    this.render();
  };

  this.render = () => {
    this.$element.innerHTML = `
    <ul>
      ${this.state.map((item) => `
        <li>${item}</li>
      `).join('')}
      </ul>
    `;
  };

  this.render();
}
