"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidationSchema = exports.commentValidationSchema = exports.userValidationsSchema = exports.organizationValidationSchema = exports.eventValidationSchema = void 0;
exports.eventValidationSchema = {
    id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    entity: {
        id: 'regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        name: 'required|string|min:3|max:60',
        date: 'required|string|max:30',
        organizer: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        poster: 'url',
        description: 'string|min:3|max:1024',
        locations: 'array',
        'locations.*': 'object',
        participants: 'array',
        'participants.*': 'object'
    }, entityToDelete: {
        id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    }
};
exports.organizationValidationSchema = {
    id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    entity: {
        id: 'regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        name: 'required|string|min:3|max:40',
        members: 'array',
        'members.*': 'object',
        mainLocation: 'object'
    },
    entityToDelete: {
        id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    }
};
exports.userValidationsSchema = {
    id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    entity: {
        id: 'regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        firstName: 'required|string|min:3|max:20',
        lastName: 'required|string|min:3|max:20',
        username: 'required|string|min:3|max:20',
        password: 'required|string|min:3|max:20',
        gender: 'required|string|min:1|max:1',
        role: 'required|string|min:3|max:10',
        status: 'required|string|min:3|max:10',
        avatar: 'url',
        created: 'number',
        modified: "number",
        description: "string",
        location: "object",
        skills: "array",
        'skills.*': 'string'
    },
    entityToDelete: {
        id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    }
};
exports.commentValidationSchema = {
    id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    entity: {
        id: 'regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        body: 'required|string|min:2|max:512',
        postedOn: "number",
        authorId: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
    },
    entityToDelete: {
        id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
};
exports.reviewValidationSchema = {
    id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    entity: {
        id: 'regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        postedOn: "number",
        authorId: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
        rating: 'number',
        reviewedId: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
    entityToDelete: {
        id: 'required|regex:^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },
};
//# sourceMappingURL=validationSchemas.js.map