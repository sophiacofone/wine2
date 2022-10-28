import pandas as pd

# Red wine data
df = pd.read_csv('winequality-red.csv', delimiter=";")
wine_type = 'red'
df['wine_type'] = wine_type
# Making sure I didn't lose any rows
print(df.shape)

# White wine data
df2 = pd.read_csv('winequality-white.csv', delimiter=";")
wine_type2 = 'white'
df2['wine_type'] = wine_type2
print(df2.shape)

# Merging dataframes
frames = [df, df2]
merged = pd.concat(frames)
merged.columns = merged.columns.str.replace(' ','_')

# Converting to csv
merged.to_csv('winequality-redwhite.csv',index=False)