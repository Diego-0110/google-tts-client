import { useState } from 'react'
import Loader from '@/components/static/Loader'
import { ArrowDropDown, ArrowDropUp } from '@/components/static/icons'
import IconButton from '@/components/interactivity/IconButton'

import styles from '@/styles/pages/index/TTSOutputs.module.css'

export default function TTSOutput ({
  output, prevOutputs, isLoading, requestError
}) {
  const [isHistoryActive, setIsHistoryActive] = useState(true)

  function handleHistoryDropDown () {
    setIsHistoryActive(!isHistoryActive)
  }

  return (
    <article className={styles.container}>
      <section className={styles.output}>
        <h2 className={styles.title}>Audio Output</h2>
        <div className={styles.content}>
          {(!isLoading && output) &&
            <audio src={output} controls></audio>}

          {(requestError || isLoading || !output) &&
            <div className={styles.infoContainer}>
              {requestError
                ? <p className={styles.errorMsg}>{requestError}</p>
                : isLoading
                  ? <Loader />
                  : <p className={styles.infoMsg}>No output yet</p>}
            </div>}
        </div>
      </section>
      <section className={styles.history}>
        <header>
          <h2 className={styles.title}>History</h2>
          <IconButton onClick={handleHistoryDropDown}>
            {isHistoryActive
              ? <ArrowDropUp width={'24px'} />
              : <ArrowDropDown width={'24px'} />}
          </IconButton>
        </header>
        <div className={styles.accordion +
          (!isHistoryActive ? ` ${styles.hide}` : '')}>
          <section className={styles.content}>
            {prevOutputs.length === 0 &&
              <div className={styles.infoContainer}>
                <p className={styles.infoMsg}>History empty</p>
              </div>}
            {prevOutputs.map((audio, index) => {
              return (
                <audio key={index} src={audio} controls></audio>
              )
            })}
          </section>
        </div>
      </section>
    </article>
  )
}
