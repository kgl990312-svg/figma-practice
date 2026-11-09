/*
 * useCopyText — 글자(전화번호)를 복사하고 2초 동안 결과 문구를 보여 주는 훅
 * 데스크톱 전화번호 복사에 씀 (PC는 전화를 걸 수 없음 — 사용자 결정 2026-11-09)
 *   의료센터 카드(MedicalCenterCard), 화면 2 전화문의(MainButton copyText), 화면 4 위치 안내(LocationCard)
 *
 * 쓰는 법
 *   const { copiedText, message, copy } = useCopyText()
 *   copy('031-5191-0520')           → 클립보드에 복사
 *   message                          → 「번호를 복사했어요」 / 「복사하지 못했어요」 / null (2초 뒤 null)
 *   copiedText                       → 방금 복사한 글자 (여러 번호 중 어느 것인지 구분할 때)
 *
 * 문구를 바꾸려면 아래 COPY_MESSAGE만 고치면 세 곳에 모두 반영된다.
 */
import { useEffect, useState } from 'react'

export const COPY_MESSAGE = { ok: '번호를 복사했어요', fail: '복사하지 못했어요' }

export function useCopyText() {
  const [result, setResult] = useState(null) // { text, ok } | null

  useEffect(() => {
    if (!result) return undefined
    const timer = setTimeout(() => setResult(null), 2000)
    return () => clearTimeout(timer)
  }, [result])

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text)
      setResult({ text, ok: true })
    } catch {
      setResult({ text, ok: false })
    }
  }

  return {
    copiedText: result?.text ?? null,
    message: result ? (result.ok ? COPY_MESSAGE.ok : COPY_MESSAGE.fail) : null,
    copy,
  }
}
