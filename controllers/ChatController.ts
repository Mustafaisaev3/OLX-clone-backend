import express from 'express'
import { AdModel } from '../models/AdModel'
import { ConversationModel } from '../models/Chat/ConversationModel'
import { MessageModel } from '../models/Chat/MessageModel'

class ChatController {
    async sendMessage (req: express.Request, res: express.Response) {
        try {
            const { adId, senderId, messageText, conversationId } = req.body

            console.log(adId, senderId, messageText, conversationId)
            
            if(conversationId){
                const conversation = await ConversationModel.findOne({_id: conversationId})

                if(conversation){
                    const message = await MessageModel.create({
                        message: messageText,
                        sender: senderId,
                        conversation: conversationId
                    })
    
                    conversation.messages.push(message._id)
                    await conversation.save()

                    res.status(200).json({status: 'success', conversationsId: conversation._id})
                }
                
            } else {

                const ad = await AdModel.findOne({_id: adId}).populate('user')
                
                const conversation = await ConversationModel.create({
                    ad: adId,
                    users: [senderId, ad?.user?._id],
                    messages: []
                })
                
                const message = await MessageModel.create({
                    message: messageText,
                    sender: senderId,
                    conversation: conversation._id
                })
                
                conversation.messages.push(message._id)
                await conversation.save()

                res.status(200).json({status: 'success'})
            }

        } catch (error) {
            res.status(400).json({error})
        }
    }
    
    async getUserConversations (req: express.Request, res: express.Response) {
        try {
            const { user } = req.body

            // const conversations = await ConversationModel.find({users: user }).populate('ad').populate('users').populate('messages')
            const conversations = await ConversationModel.find({users: user }).populate({
                path: 'ad',
                populate: {
                    path: 'photos'
                }
            }).populate('users').populate('messages')
            
            res.status(200).json({status: 'success', data: conversations})
        } catch (error) {
            console.log(error)
            res.status(400).json({error})
        }
    }

    async getConversation (req: express.Request, res: express.Response) {
        try {
            const { adId, userId } = req.body

            // const conversations = await ConversationModel.find({users: user }).populate('ad').populate('users').populate('messages')
            const conversation = await ConversationModel.find({ad: adId, users: userId }).populate('messages')
            
            res.status(200).json({status: 'success', data: conversation})
        } catch (error) {
            console.log(error)
            res.status(400).json({error})
        }
    }
}

export const ChatCtrl = new ChatController()