import {Publisher} from "../model/index.js";

export const findPublisherById = async (id) => {
    return await Publisher.findByPk(id);
}

export const addPublisher = async (publisherName) => {
    return await Publisher.create({publisher_name: publisherName});
}