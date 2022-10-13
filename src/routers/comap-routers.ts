import { IComment } from "../model/comment";
import { IEvent } from "../model/event";
import { IOrganization } from "../model/organization";
import { IPlace } from "../model/place";
import { IReview } from "../model/review";
import { IUser } from "../model/user";
import { commentValidationSchema, eventValidationSchema, organizationValidationSchema, reviewValidationSchema, userValidationsSchema } from "../model/validationSchemas";
import { AuthRouter } from "./auth-router";
import customRouter from "./custom-router";
import modifyChildRouter from "./modifyChildRouter";
// import { EventsRepository, CommentsRepository, OrganizationsRepository, PlacesRepository, ReviewsRepository, UsersRepository } from "../dao/repository";

const childCommentsRouter = customRouter<IComment>('comment',true,commentValidationSchema)
modifyChildRouter(childCommentsRouter,'comment',commentValidationSchema);
const childReviewsRouter = customRouter<IReview>('review',true,reviewValidationSchema)
modifyChildRouter(childReviewsRouter,'review',reviewValidationSchema);


export const eventsRouter = customRouter<IEvent>('event',false,eventValidationSchema);
eventsRouter.use('/:parentid/comments',childCommentsRouter);

export const usersRouter = customRouter<IUser>('user',false,userValidationsSchema)
usersRouter.use('/:parentid/comments',childCommentsRouter )

export const organizationsRouter = customRouter<IOrganization>('organization',false,organizationValidationSchema);
organizationsRouter.use('/:parentid/comments',childCommentsRouter)

export const commentsRouter = customRouter<IComment>('comment');
export const reviewsRouter =  customRouter<IReview>('review');
export const placesRouter = customRouter<IPlace>('place');
export const authRouter = AuthRouter();