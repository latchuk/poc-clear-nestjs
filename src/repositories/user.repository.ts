import { User } from "src/models/user.model";
import { PagedResult } from "./shared/paged-result";
import { ListUserQuery } from "src/services/user/list-user.service";

export abstract class UserRepository {
    abstract findUserById(userId: string): Promise<User>;
    abstract createUser(user: User): Promise<User>;
    abstract listUsers(query: ListUserQuery): Promise<PagedResult<User>>;
    abstract deleteUser(userId: string): Promise<void>;
}