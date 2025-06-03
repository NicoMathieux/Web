const hasInteracted = ref(false)

export const useInteraction = () => {
  onMounted(() => {
    const setInteracted = () => {
      hasInteracted.value = true
      window.removeEventListener('click', setInteracted)
      window.removeEventListener('keydown', setInteracted)
      window.removeEventListener('touchstart', setInteracted)
    }

    if (!hasInteracted.value) {
      window.addEventListener('click', setInteracted)
      window.addEventListener('keydown', setInteracted)
      window.addEventListener('touchstart', setInteracted)
    }
  })

  return {
    hasInteracted,
  }
}
