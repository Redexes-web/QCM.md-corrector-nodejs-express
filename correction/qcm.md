# QCM

## Question 1

Que signifie ECMAScript ?

_Réponses_ :

- [ ] C'est un langage de programmation
- [ ] C'est une base de données
- [ ] C'est un service Web
- [x] C'est un ensemble de normes

## Question 2

Quels sont les types primitifs en JS ?
_coefficient_ : 1
_Réponses_ :

- [ ] boolean null undefined number bigint
- [x] boolean null undefined number bigint string symbole
- [ ] Object number string
- [ ] Object boolean null undefined number bigint string symbole

## Question 3

Quel est le nom de l'attribut ou méthode permettant de calculer la taille d'un Map ?
_Réponses_ :

```javascript
const myMap = new Map([1, 2, 3]);
```

- [ ] len
- [ ] length
- [x] size
- [ ] size()

## Question 4

Qu'affiche le code suivant ?

```javascript
const ensemble = new Set([1, 2, 3, 4, 5, 5]);
console.log(ensemble);
```

_Réponses_ :

- [ ] `[1, 2, 3, 4, 5, 5]`
- [ ] `{1, 2, 3, 4, 5, 5}`
- [x] `{1, 2, 3, 4, 5}`
- [ ] `{1, 2, 3, 4, 5, 5}`

## Question 5

_coefficient_ : 1
Qu'affiche le code suivant ?

```javascript
let b = 1;

function baz() {
	let [b, c] = [1, 2];
	console.log(b, c);
	function foo() {
		console.log(c);
	}
}
console.log(b);
baz();
```

_Réponses_ :

- [ ] 1 2
- [x] 1 1 2
- [ ] 1 1 2 2
- [ ] 1 1

## Question 6

Qu'affiche le code suivant ?

```javascript
const t1 = [1, 2];
const t2 = t1;
t1.push(3);
console.log(t1);
```

_Réponses_ :

- [ ] Une SyntaxError
- [x] `[1,2,3]`
- [ ] `[1,2]`
- [ ] `{1,2,3}`

## Question 7

Qu'affiche le code suivant ?

```javascript
for (let j = 0; j < 10; j++) {}
console.log(j);
```

_Réponses_ :

- [x] `ReferenceError`
- [ ] `SyntaxError`
- [ ] 10
- [ ] null

## Question 8

Qu'affiche le code suivant ?

```javascript
let x, y;
[x, , y] = [10, 20, 11, 111];
console.log(x, y);
```

_Réponses_ :

- [ ] `SyntaxError`
- [ ] `ReferenceError`
- [x] 10 11
- [ ] 10 111

## Question 9

Qu'affiche le code suivant ?

```javascript
let x, y;
[, , , ...rest] = [10, 20, 11, [111, 120, 7]];
console.log(rest.shift());
```

_Réponses_ :

- [ ] `SyntaxError`
- [ ] `ReferenceError`
- [ ] 7
- [x] `[111,120, 7]`

## Question 10

Que vaut le tableau t2 ?

```javascript
let t1 = [1, 2];
let t2 = [...t1];
t2.push(3);
console.log(t1);
```

_Réponses_ :

- [ ] `[[1, 2]]`
- [ ] `[3]`
- [x] `[1,2,3]`
- [ ] `[1, 2]`

## Question 11

Que vaut le tableau t2 ?

```javascript
let t1 = [1, 2];
let t2 = t1.map((x) => x);
t2.push(3);
console.log(t1);
```

_Réponses_ :

- [ ] `[[1, 2]]`
- [ ] `[3]`
- [x] `[1,2,3]`
- [ ] `[1, 2]`

## Question 12

Qu'affiche le code suivant ?

```javascript
const phrase = '8790:bonjour le monde:8987:7777:Hello World:9007';
const sentence = phrase
	.split(':')
	.map((w) => w.slice(w.length - 1))
	.filter(Number);
console.log(sentence);
```

_Réponses_ :

- [x] `["7", "7", "7"]`
- [ ] `[7, 7, 7]`
- [ ] `[]`
- [ ] `["8790", "8987", "7777", "9007"]`

## Question 13

Qu'affiche le code suivant ?

```javascript
const phrase = '8790:bonjour le monde:8987:7777:Hello World:9007';
const sentence = phrase.split(':').map((w) => w.slice(w.length - 1));
console.log(sentence);
```

_Réponses_ :

- [ ] `["7", "7", "7"]`
- [ ] `[7, 7, 7]`
- [ ] `[]`
- [x] `["0", "e", "7", "7", "d", "7"]`

## Question 14

Comment récupérer le name et le nom de la soeur en utilisant de la desctructuration ?

```javascript
const st = {
	name: 'Alan',
	family: {
		mother: 'Isa',
		father: 'Philippe',
		sister: 'Sylvie',
	},
	age: 35,
};
```

_Réponses_ :

- [x] `const { name, family : { sister }} = st;`
- [ ] `const { name, sister } = st;`
- [ ] `const { name, family.sister } = st;`
- [ ] `const { name, sister : { family }} = st;`

## Question 15

Qu'affiche le code suivant ?

```javascript
class Rectangle {
	constructor(w, h) {
		this._w = w;
		this._h = h;
	}

	get w() {
		return this._w;
	}
}

class Square extends Rectangle {
	constructor(w) {
		this._w = w;
		super(w);
	}
	// ...
}

console.log(new Square(3).w);
```

_Réponses_ :

- [x] `ReferenceError` // On doit utiliser super() avant d'acceder a this dans la classe enfant
- [ ] 3
- [ ] 9
- [ ] `SyntaxError`

## Question 16

Qu'affiche le code suivant ?

```javascript
class Model {
	constructor(tableName) {
		this._tableName = tableName;
	}

	set tableName(tableName) {
		this._tableName = tableName;
	}

	get tableName() {
		return this._tableName;
	}
}

const t1 = new Model('posts');
const t2 = new Model('POSTS');
console.log(t1.tableName);
```

_Réponses_ :

- [ ] `ReferenceError`
- [ ] POSTS
- [x] posts
- [ ] `SyntaxError`

## Question 17

Qu'affiche le code suivant ?

```javascript
const st = {
	id: 5,
	name: 'Alan',
	age: 45,
	relationships: [1, 2],
};
const response = ({ name, age }) => ({ name, age });

console.log(response(st));
```

_Réponses_ :

- [ ] `SyntaxError`
- [ ] `{name : "Alan", age : null}`
- [x] `{name : "Alan", age : 45}`
- [ ] `({name : "Alan", age : 45})`

## Question 18

Qu'affiche le code suivant ?

```javascript
const st = {
	id: 5,
	name: 'Alan',
	age: 45,
	relationships: [1, 2],
};
const response = ({ name, age }) => ({ name, age });

const { name: n } = response(st);
console.log(`-> ${n[0]}`);
```

_Réponses_ :

- [ ] `-> Alan`
- [x] `-> A`
- [ ] `-> {name : "Alan"}`
- [ ] `SyntaxError`

## Question 19

Qu'affiche le code suivant ?

```javascript
const Add = (number, callback) => {
	setTimeout(() => {
		callback(number);
	}, 500);
};

Add(1, (number) => {
	let sum = number;
	Add(2, (number) => {
		sum += number;
		Add(3, (number) => {
			sum += number;
			console.log(sum);
		});
	});
});
```

_Réponses_ :

- [ ] undefined
- [ ] ""
- [x] 6
- [ ] 3

## Question 20

Comment définissez-vous Javascript ?
_Réponses_ :

- [ ] Javascript est synchrone multi-thread
- [ ] Javascript est synchrone mono-thread
- [ ] Javascript est asynchrone multi-thread
- [x] Javascript est asynchrone mono-thread

## Question 21

Qu'affiche le code suivant ? Choisissez la bonne réponse avec la bonne explication.

```js
console.log('24' + 0.2 * '24');
```

- [ ] undefined, JS retourne cette valeur car il est incapable d'effectuer le calcul.
- [x] '244.800000000000001', "24" est concaténé au résultat de l'opération 0.2 \*"24".
- [ ] '244.800000000000001', ce résultat est produit de manière aléatoire.
- [ ] 244.800000000000001, c'est le bon résultat des opération + et \*.

## Question 22

Quelle est la valeur du résultat suivant ? Répondez en choisissant qu'une seule et bonne réponse.

```js
console.log(!isNaN(parseFloat('27.8')));
```

- [ ] NaN
- [x] true
- [ ] false
- [ ] 27.8
