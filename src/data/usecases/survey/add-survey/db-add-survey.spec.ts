import { DbAddSurvey } from './db-add-survey'
import { AddSurvey, AddSurveyRepository, AddSurveyModel } from './db-add-survey-protocols'
import MockDate from 'mockdate'

type SutTypes = {
  sut: AddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return { sut, addSurveyRepositoryStub }
}

const makeAddSurveyRepositoryStub = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyModel): Promise<void> {
    }
  }
  return new AddSurveyRepositoryStub()
}

const makeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const surveyData = makeSurveyData()

    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const promise = sut.add(makeSurveyData())
    await expect(promise).rejects.toThrow()
  })
})