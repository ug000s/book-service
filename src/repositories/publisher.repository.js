import {Publisher} from "../model/index.js";

export const findPublisherById = async (id, options = {}) => {
    return await Publisher.findByPk(id, options);
}

export const addPublisher = async (publisherName, options = {}) => {
    return await Publisher.create({publisher_name: publisherName}, options);
}