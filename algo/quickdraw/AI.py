import pandas as pd
import numpy as np
import cv2
import keras

cnn = keras.models.load_model('quickdraw/ai/model.h5')
label_lookup_df = pd.read_csv('quickdraw/ai/pathlabel_lookup.csv')

def AIfunction(vector, word):

  #1. data에 vector 추가
  data = [vector]
  #2. data를 dataframe으로 변경
  df = pd.DataFrame(data, columns=["drawing"])
  
  def img_to_np(img_str, ht, wt, lw, pad):
    strokes = eval(img_str)
    ht_ = ht - 2*pad
    wt_ = wt - 2*pad
    img = np.zeros((ht, wt), np.uint8)
    for s in strokes:
      sx = (np.array(s[0]) * wt_ / 256).round().astype('int') + pad
      sy = (np.array(s[1]) * ht_ / 256).round().astype('int') + pad
      for i in range(len(sx) - 1):
        p1 = (sx[i],   sy[i])
        p2 = (sx[i+1], sy[i+1])
        img = cv2.line(img, p1, p2, (255, 0, 0), lw, lineType=cv2.LINE_AA)
    return img

  test_imgs = np.zeros(shape = (df.shape[0], 64, 64, 1))

  for i, row in df.iterrows():
    test_imgs[i,:,:,0] = img_to_np(row.drawing, 64, 64, 1, 2) / 255

  probs = cnn.predict(test_imgs)
  N_train = probs.shape[0]

  for i in range(N_train):
    p = probs[i, :]
    top_classes = np.argpartition(p, -40)[-40:]
    top_classes = top_classes[np.argsort(p[top_classes])]
    top_classes = np.flip(top_classes)
  
  topList = top_classes
  label_lookup = {k:v for k,v in zip(label_lookup_df.index.values, label_lookup_df.label.values)}
  labels = []

  for i in topList:
    labels += [label_lookup[i]]

  draw = labels[0]
  for label in labels:
    if (label == word):
      draw = label
      break
  
  return draw