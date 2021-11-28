// 1️⃣ Comfile
// Comfile this file by $ npx tsc

// console.log("hello");

// 2️⃣ Typed language
// ts is a typed language
// It means 어떤 종류의 변수와 데이터 인지 설정을 해줘야 한다. 
// -> js보다 섬세하므로[예상가능하므로] 코드를 해석하기 쉽고 컴파일러 시 어떤 버그가 있는지 알려줌
// ex) 아래 코드와 같이 sayHi(name, age, gender); 로 해야하는데 sayHi(name, age); 로 실수하면 컴파일시 이 실수를 알려줌 또한 이 코드에 커서를 올려놓으면 어떤 실수를 했는지 알 수 있음
// e2) 어떤 부분에서 ts는 문자열 만이 들어갈 것을 예상
// ex3) 어떤 함수는 boolean function을 리턴 또는 숫자들의 배열을 리턴

const name = "Nicolas",
    age = 24,
    gender = "male";

const sayHi = (name, age, gender) => { // -> This func need name, age, gender / "gender?"을 하면 gender pram is a option. So when you call this func without "gender", "gender" is printed to undefined  
    console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
};

sayHi(name, age, gender);
// sayHi(name, age); // > Hover then ts show 3 itmes. ; ts know your mistake (js can't do this)

// 3️⃣ types
// types 는 expectable 하게 해줌
// When hover on const sayHi, you can see const sayHi: (name: any, age: any, gender: any) => void
// void 자리 : sayHi func가 어떤 유형의 값을 반환하는지 나타내기 위해.
// ex) 어떤 함수에서는 true라는 값을 반환한다면 "=>void"가 아니라 "=>boolean"?으로 바꿔야함
// 따라서 void 자리에 어떤 값이 나오게 할건지 지정해줘야함 (나는 a함수가 숫자를 반환했으면해)
// void : 값이 아무것도 안나오게 지정하기 (콘솔로그도 void임)

// When hover on const sayHello, you can see  const sayHi와의 차이
// Strength: (c-001) When you call the func with different type like "44"(str) not 44(num), Hover then js show "strig 타입의 44가 number 타입의 파리미터에 허용되지 않는다"

// const sayHello = (name: string, age:number, gender:string):void => {
//     console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
// };

const sayHello = (name: string, age:number, gender:string):string => { // ( ):sting  means this fune return str
    // console.log(`Hello ${name}, you are ${age}, you are a ${gender}`); // 위 마지막 string 을 void 로
    return `Hello ${name}, you are ${age}, you are a ${gender}`;
};

sayHello("Nicol", 44, "male");
// sayHello("Nicol", "44", "male"); // c-001

//---------------------(No Code Share)--------------------------
// 4️⃣ Interfaces
// How can you call a func with an object  not 3 args
// Without interface, the func won't work. Cuz the func is expected to 3 args not one object.
// -> Solve : Interface
// Object is expectable by interface. Both obj and interface must have a same structure.

interface Human {
    name: string;
    age: number;
    gender: string;
}

const person = { // object
    name: "nicolas",
    age: 22,
    gender: "male"
}

// const sayBye = (name: string, age:number, gender:string): string => {
//     return `Hello ${name}, you are ${age}, you are a ${gender}`;
// };

const sayBye = (person: Human): string => { // (obj: its type)
        return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender
        }`;
    };

console.log(sayBye(person))

//---------------------(No Code Share)--------------------------
// 5️⃣ Classes
// When: 문제가 일어나는 것을 막기 위해 interface는 js로 컴파일되지 않는다 ; js 파일에는 interface가 없음
//       넣고 싶다면 interface 대신 class 필요

// Class helps to control code
// How: Js에서는 클래스의 속성들을 묘사할 필요가 없지만 (어떤 속성인지 신경x) ts에서는 클래스가 어떤 속성들을 가져야 하는지 선언해야한다. 그런 속성들이 가지고 있는 권한들도.

class Human {
    public name: string; // name이라는 변수명으로 public 속성을 선언 ; 변수를 public하게 선언 / js에 없음 public 이란게 js에 없으니까 / private name : 이 클래스 내부에서만 접근 가능 ;  밖에서는 person.name 으로 이 변수 호출x
    public age: number;
    public gender: string;
    constructor(name: string, age: number, gender: string){ // 생성자는 메서드임 / 클래스가 시작할때마다 호출됨 ; 클래스로부터 객체를 만들 때 마다
        this.name = name; // 이 클래스("this") 속성의 이름인 name = 생성자의 name
        this.age = age;
        this.gender = gender;
    }
}

const sarah = new Human("Sarah", 18, "female") // class와 구조 같게 괄호에 넣어주기

const sayGoodbye = (person: Human): string => {
    return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender
    }`;
};

console.log(sayGoodbye(sarah))

// 6️⃣ Project
import * as CryptoJS from "crypto-js";
// 1. 블록의 구조
class Block {
    // 이 메소드는 4번 과정
    // 아래 두 메소드의 차이 : (함수명 앞에 static이 없냐 있냐) 후자는 static method. It means 클래스가[새 블록이] 생성되지 않았어도 내가 호출할 수 있는 메소드 ; 이 클래스 안에서 항상 사용 가능한 메소드
    // sayHello() => return "hello" // 이 클래스 바로 아래 주석과 3번의 마지막 주석 참고
    static calculateBlockHash = (
        index: number,
        previousHash: string,
        timestamp: number,
        data: string
    ): string => // 리턴값의 타입
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString(); // 리턴값

    // 7번 과정
    static validateStructure = (aBlock: Block) : boolean => // 이 함수는 Block 타입의 블록을 전달받음
        typeof aBlock.index === "number" && 
        typeof aBlock.hash === "string" && 
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

// Block.sayHello() // impossible cuz you need to create a block first ; const genesisBlock 아래로 이 코드 옮기기
// 블록을 생성하지 않아도 사용가능한 메소드 만드는 법 : static method

// 2. 첫번째 블록 생성
const genesisBlock: Block = new Block(0, "2020202020202", "", "Hello", 123456); // 콜론 다음에 type 표기

// 3. Create blockchain
let blockchain: Block[] = [genesisBlock]; // Block[] : 블록체인은 블록의 연결이므로 타입이 array of blocks
// let blockchain: Block[] = [genesisBlock.sayHello()]; // 이 함수[코드]는 블록생성 코드 다음에 위치

// 4. Method to create new block
// 해쉬를 계산해야[무엇인지 알고] 다음 블록을 만들 수 있음
// $ npm install crypto-js
// calculateBlockHash method 는 4번 과정

// 5. 함수들
const getBlockchain = (): Block[] => blockchain; // return type: => return value; / 블록체인에 블록을 추가하기 위해서 블록체인이 얼마나 긴지 알기 위해

const getLatestBlock = (): Block => blockchain[blockchain.length - 1]; // 블록체인 안에서 가장 최근 블록을 반환하는 코드

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

// 6. 다른 새로운 블록을 생성하는 함수 구현
const createNewBlock = (data: string): Block => { // string 타입의 data 인자가 필요 ; 이 함수를 콜할때 data를 넘겨줌
    const previousBlock: Block = getLatestBlock(); // 새 블록을 만들기 위해서 이전 블록을 가져와야함
    const newIndex : number = previousBlock.index + 1; // 만들어질 블록의 인덱스는 이전 블록 인덱스 다음임
    const newTimestamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimestamp,
        data
    );
    // Create a block and return it
    const newBlock : Block = new Block(
        newIndex, 
        newHash,
        previousBlock.hash,
        data,
        newTimestamp
    );
    addBlock(newBlock);
    return newBlock;
};

const getHashforBlock = (aBlock: Block) :string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

// 7. Validating Block Structure
// 블록 구조가 유효한지 체크
const isBlockValid = (candidateBlock : Block, previousBlock: Block): boolean => { // This func bring in candidate block and previous block  to compare both
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) { // 따로 해쉬를 계산해서, 들어온 블록의 해쉬가 실제로 있는지 체크
        return false;
    } else {
        return true;
    }
};

// 8. 블록체인에 블록 추가
const addBlock = (candidateBlock: Block): void => { // Return nothing
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);
// console.log(createNewBlock("hello"), createNewBlock("bye bye"));

export {}; // ts can know this fil becomes a module. Without it, you can declare "name"
