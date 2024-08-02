## Testing Library

## - Core API Queries

### `byRole`

byRole은 다양한 HTML 요소의 접근성 역할을 기반으로 요소를 찾습니다.

```js
test("finds a button by its role", () => {
  render(<button>Click me</button>);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

//name 옵션을 사용하여 요소의 텍스트 콘텐츠로 요소를 찾을 수 있습니다.
test("finds a button by its role and name", () => {
  render(<button>Click me</button>);
  const buttonElement = screen.getByRole("button", { name: "Click me" });
  expect(buttonElement).toBeInTheDocument();
});
```

### `byLabelText`

byLabelText는 레이블 텍스트를 기반으로 폼 요소(예: 입력 필드, 체크박스, 라디오 버튼 등)를 찾습니다. 이 메서드는 `<label>` 요소와 연결된 폼 요소를 쉽게 선택할 수 있게 해줍니다.

```js
test("finds an input by its label text", () => {
  render(
    <div>
      <label htmlFor="username">Username</label>
      <input id="username" />
    </div>
  );

  const inputElement = screen.getByLabelText("Username");
  expect(inputElement).toBeInTheDocument();
});
```

### `byPlaceholderText`

byPlaceholderText는 placeholder 속성을 기준으로 요소를 찾습니다.

```js
test("finds an input by its placeholder text", () => {
  render(<input placeholder="Enter your name" />);

  const inputElement = screen.getByPlaceholderText("Enter your name");
  expect(inputElement).toBeInTheDocument();
});

// exact 옵션을 사용하여 대소문자를 구분하지 않고 요소를 찾을 수 있습니다.
test("finds an input by its placeholder text with options", () => {
  render(<input placeholder="Enter your email" />);

  const inputElement = screen.getByPlaceholderText("Enter your email", {
    exact: false,
  });
  expect(inputElement).toBeInTheDocument();
});
```

### `byText`

byText는 텍스트 콘텐츠를 기준으로 요소를 찾습니다.

```js
test("finds an element by its text content", () => {
  render(<div>Hello, World!</div>);

  const element = screen.getByText("Hello, World!");
  expect(element).toBeInTheDocument();
});

//selector 옵션을 사용하여 특정 요소 타입을 더 구체적으로 지정할 수 있습니다.
test("finds an element by its text content with selector option", () => {
  render(
    <div>
      <span>Text inside span</span>
      <div>Text inside div</div>
    </div>
  );

  const element = screen.getByText("Text inside span", { selector: "span" });
  expect(element).toBeInTheDocument();
});
```

### `byDisplayValue`

byDisplayValue는 폼 요소의 현재 표시된 값을 기준으로 요소를 찾습니다.

```js
test("finds an input by its display value", () => {
  render(<input value="Hello, World!" readOnly />);

  const inputElement = screen.getByDisplayValue("Hello, World!");
  expect(inputElement).toBeInTheDocument();
});
```

### `byAltText`

alt 텍스트를 기준으로 이미지 요소를 찾습니다.

```js
test("finds an image by its alt text", () => {
  render(<img src="logo.png" alt="Company Logo" />);

  const imgElement = screen.getByAltText("Company Logo");
  expect(imgElement).toBeInTheDocument();
});
```

### `byTitle`

title 속성을 기반으로 요소를 찾습니다.

```js
test("finds an element by its title attribute", () => {
  render(<img src="logo.png" title="Company Logo" alt="Company Logo" />);

  const imgElement = screen.getByTitle("Company Logo");
  expect(imgElement).toBeInTheDocument();
});
```

### `byTestId`

data-testid 속성을 기반으로 요소를 찾습니다.

```js
test("finds an element by its test id", () => {
  render(<div data-testid="custom-element">Hello, World!</div>);

  const element = screen.getByTestId("custom-element");
  expect(element).toBeInTheDocument();
});
```

## - user-event

실제 사용자가 웹 페이지와 상호작용하는 것처럼 테스트를 작성할 수 있도록 도와줍니다. 클릭, 입력, 키보드 이벤트, 마우스 이벤트 등 다양한 사용자 상호작용을 시뮬레이션할 수 있는 함수를 제공합니다.

### `click`

```js
test("button click", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);

  userEvent.click(screen.getByText("Click Me"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### `type`

```js
test("typing in input field", () => {
  render(<Input placeholder="Enter text" />);

  const inputElement = screen.getByPlaceholderText("Enter text");
  userEvent.type(inputElement, "Hello, World!");
  expect(inputElement).toHaveValue("Hello, World!");
});
```

### `selectOptions`

```js
function SelectBox() {
  return (
    <select>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </select>
  );
}

test("selects an option", () => {
  render(<SelectBox />);
  const select = screen.getByRole("combobox");
  userEvent.selectOptions(select, "option2");
  expect(screen.getByRole("option", { name: "Option 2" }).selected).toBe(true);
});
```

## JEST

## - Matchers

### `toBeInTheDocument`

```js
test("renders component", () => {
  render(<MyComponent />);
  const element = screen.getByText("Hello, World!");
  expect(element).toBeInTheDocument();
});
```

### `toHaveBeenCalledTimes`

```js
test("button click calls onClick handler exact number of times", () => {
  const handleClick = jest.fn();

  render(<ButtonComponent onClick={handleClick} />);

  const button = screen.getByText("Click me");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(2);
});
```
