import { call, put, takeLatest } from "redux-saga/effects"
import {
  fetchCurrentModuleFailure,
  fetchCurrentModuleRequest,
  fetchCurrentModuleSuccess,
} from "@/store/slices/ superAdmin/currentModuleSlice"
import { getCurrentModule } from "@/lib/api/services/superAdmin/superAdminService";

function* handleFetchCurrentModule() {
  try {
    const res: { success: boolean; data: { current_module: string } } = yield call(getCurrentModule)
    if (res.success) {
      yield put(fetchCurrentModuleSuccess(res.data.current_module))
    } else {
      yield put(fetchCurrentModuleFailure("Failed to fetch current module"))
    }
  } catch (error: any) {
    yield put(fetchCurrentModuleFailure(error.message || "Something went wrong"))
  }
}

export default function* currentModuleSaga() {
  yield takeLatest(fetchCurrentModuleRequest.type, handleFetchCurrentModule)
}
