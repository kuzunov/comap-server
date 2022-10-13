// export const eventValidationSchema = {
//     id: {parentid: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'},
//     entity: {
//         id: 'regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//         name: 'required|string|min:3|max:60',
//         date: 'required|string|max:30',
//         organizer: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//         poster: 'url',
//         description: 'string|min:3|max:1024',
//         created:"number",
//         modified:"number",
//         locations: 'array',
//         'locations.*': 'object',
//          participants: 'array',
//         'participants.*': 'object'
//     },    
//     entityToDelete: {
//         id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//     }

import { validations } from "indicative/validator";

    

// }
// export const organizationValidationSchema = {
//     id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//     entity: {
//         id:'regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//         name: 'required|string|min:3|max:40',
//         members: 'array',
//         'members.*':'object',
//         mainLocation: 'object',
//         created:"number",
//         modified:"number",
//     },
//     entityToDelete: {
//         id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//     }
// }
// export const userValidationsSchema = {
//     id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//     entity: {
//         id:'regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//         firstName: 'required|string|min:3|max:20',
//         lastName: 'required|string|min:3|max:20',
//         username: 'required|string|min:3|max:20',
//         password: 'required|string|min:3|max:20',
//         gender: 'required|string|min:1|max:1',
//         role: 'required|string|min:3|max:10',
//         status: 'required|string|min:3|max:10',
//         avatar: 'url',
//         created: 'number',
//         modified: "number",
//         description: "string",
//         location:"object",
//         skills:"array",
//         'skills.*':'string'
//     },
//     entityToDelete: {
//         id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//     }
// }

// export const commentValidationSchema = {
//     id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//     entity: {
//         id: 'regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//         body:'required|string|min:2|max:512',
//         created:"number",
//         modified:"number",
//         authorId:'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
//     },
//     entityToDelete: {
//         id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//     },
//     childEntity: {
//         childid: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',

//     }

// }
// export const reviewValidationSchema = {
//     id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//     entity: {
//         id: 'regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//         created:"number",
//         modified:"number",
//         authorId:'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//         rating:'number',
//         reviewedId:'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',

//     },
//     entityToDelete: {
//         id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
//     },
//     childEntity: {
//         childid: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',

//     }

// }
class validationSchema {
    constructor (entitySchema) {
        this.entity = entitySchema;
    };
    id = {parentid: 'required'}
    entity = {}
    entityToDelete = {
        id: 'required',
    }
    childEntity = {
        childid: 'required',

    }
}
export const eventValidationSchema = new validationSchema({
    name: 'required|string|min:3|max:60',
    date: 'required|string|max:30',
    organizer: 'required|string',
    poster: 'url',
    description: 'string|min:3|max:1024',
    created:"number",
    modified:"number",
    // locations: 'array',
    // 'locations.*': 'object',
    //  participants: 'array',
    // 'participants.*': 'string'
});

export const organizationValidationSchema = new validationSchema({
    name: 'required|string|min:3|max:40',
    members: 'array',
    'members.*':'object',
    mainLocation: 'object',
    created:"number",
    modified:"number",
})

export const userValidationsSchema = new validationSchema({
    firstName: 'required|string|min:3|max:20',
    lastName: 'required|string|min:3|max:20',
    username: 'required|string|min:3|max:20',
    password: 'required|string|min:3|max:20',
    gender: 'required|string|min:1|max:1',
    avatar: 'url',
    description: "string",
    location:"object",
    skills:"array",
    'skills.*':'string'
});

export const commentValidationSchema = new validationSchema( {
    body:'required|string|min:2|max:512',
    authorId: 'required',
    parentId:'required',
    created:"number",
    modified:"number",
});
export const reviewValidationSchema = new validationSchema({
    created:"number",
    modified:"number",
    rating:'number',
    authorId:'required'
});

export const credentialsValidationSchema = {
        username: 'required|string|min:3|max:20',
        password: 'required|string|min:3|max:20'
}