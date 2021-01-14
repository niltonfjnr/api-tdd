import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

import { Collection } from 'mongodb'

type SutTypes = {
  sut: SurveyMongoRepository
}

const makeSut = (): SutTypes => {
  return {
    sut: new SurveyMongoRepository()
  }
}

const mockAddSurveys = (): AddSurveyParams[] => {
  return [
    {
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      }],
      date: new Date()
    },
    {
      question: 'other_question',
      answers: [{
        image: 'other_image',
        answer: 'other_answer'
      }],
      date: new Date()
    }
  ]
}

let surveyCollection: Collection

describe('Suvey Mongo Repository', () => {
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

  describe('add()', () => {
    test('Should add a survey on success', async () => {
      const { sut } = makeSut()
      await sut.add({
        question: 'any_question',
        answers: [
          { image: 'any_image', answer: 'any_answer' },
          { answer: 'other_answer' }
        ],
        date: new Date()
      })
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const { sut } = makeSut()
      await surveyCollection.insertMany(mockAddSurveys())
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].id).toBeTruthy()
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
    })

    test('Should load empty list', async () => {
      const { sut } = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const { sut } = makeSut()
      const result = await surveyCollection.insertOne(mockAddSurveys()[0])

      const survey = await sut.loadById(result.ops[0]._id)
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })
  })
})
