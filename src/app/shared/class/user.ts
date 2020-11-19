/**
 * 사용자 정보를 담는 Class 입니다. 이 객체를 가지고 옵저버블을 사용하므로
 * Interface로 선언하지 않고 class로 사용합니다.
 */
export class User {
    constructor(
        public id: string,
        public engName: string,
        public korName: string){
        }
}

/**
 * User를 생성하는 helper 클래스를 만들어 봤는데요...그닥.
 */
export class UserMaker {
    static create(data: User): User {
        return new User(data.id, data.engName, data.korName);
    }

    static initialize(): User {
        return new User("", "", "");
    }
}

