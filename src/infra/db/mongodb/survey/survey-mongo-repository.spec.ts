import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

interface SutTypes {
  sut: SurveyMongoRepository
}

const makeSut = (): SutTypes => {
  return {
    sut: new SurveyMongoRepository()
  }
}

let surveyCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })
  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should add a survey on success', async () => {
    const { sut } = makeSut()
    await sut.add({
      question: 'any_question',
      answers: [
        { image: 'any_image', answer: 'any_answer' },
        { answer: 'other_answer' }
      ]
    })
    const survey = await surveyCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })
})
