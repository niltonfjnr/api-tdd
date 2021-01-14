import { mockSurveyResultModel } from '@/domain/test'
import { SurveyResultModel, LoadSurveyResultRepository } from './db-load-survey-result-protocols'

import { DbLoadSurveyResult } from './db-load-survey-result'

describe('DbLoadSurveyResult UseCase', () => {
  type SutTypes = {
    sut: DbLoadSurveyResult
    loadSurveyResultRepositoryStub: LoadSurveyResultRepository
  }

  const makeSut = (): SutTypes => {
    const loadSurveyResultRepositoryStub = makeLoadSurveyResultRepository()
    const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
    return { sut, loadSurveyResultRepositoryStub }
  }

  const makeLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
    class LoadSurveyRepositoryStub implements LoadSurveyResultRepository {
      async loadBySurveyId (surveyId: string): Promise<SurveyResultModel> {
        return mockSurveyResultModel()
      }
    }
    return new LoadSurveyRepositoryStub()
  }

  test('Should call LoadSurveyResultRepository', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
